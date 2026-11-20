import { expect, test } from "@playwright/test";

test("inline fields activate as underlined text and broadcast changes on blur", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\b(?:light|dark)\b/, { timeout: 15000 });

  const heading = page.getByRole("heading", { name: "Inline Edit" });
  const sample = heading.locator("..");
  const editTitle = sample.getByRole("button", { name: /^Edit Project title/ });
  const titleField = sample.getByRole("textbox", { name: "Project title" });
  const heights = () => sample.locator(".s-inline-edit").evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().height));
  const restingHeights = await heights();
  await expect(sample.locator(".s-inline-edit button, .s-inline-edit label")).toHaveCount(0);
  await expect(editTitle).toHaveCSS("text-decoration-style", "dotted");
  await editTitle.press("Enter");
  await expect(titleField).toBeFocused();
  await expect(titleField).toHaveValue("Project Atlas");
  expect(await titleField.getAttribute("placeholder")).toBeNull();
  expect(await heights()).toEqual(restingHeights);

  await titleField.fill("Project North");
  await titleField.press("Tab");
  await expect(editTitle).toHaveText("Project North");
  await expect(editTitle).not.toBeFocused();
  expect(await heights()).toEqual(restingHeights);

  await editTitle.click();
  await titleField.fill("Unsaved title");
  await titleField.press("Escape");
  await expect(editTitle).toBeFocused();
  await expect(editTitle).toHaveText("Project North");

  const editNotes = sample.getByRole("button", { name: /^Edit Release notes/ });
  const notesField = sample.getByRole("textbox", { name: "Release notes" });
  await editNotes.click();
  await expect(notesField).toBeFocused();
  expect(await heights()).toEqual(restingHeights);
  await expect(sample.locator(".s-inline-edit button, .s-inline-edit label")).toHaveCount(0);
  await notesField.fill("Review complete");
  await notesField.press("End");
  await notesField.press("Enter");
  await notesField.press("s");
  await expect(notesField).toHaveValue("Review complete\ns");
  const wrappedNotes = "A long note that wraps across several lines. ".repeat(12).trimEnd();
  await notesField.fill(wrappedNotes);
  expect((await heights())[1]).toBeGreaterThan(restingHeights[1]);

  const longNotes = `${wrappedNotes}\nCheck notes\nSend update\nDone\n`;
  await notesField.fill(longNotes);
  const expandedHeights = await heights();
  expect(expandedHeights[0]).toBe(restingHeights[0]);
  expect(expandedHeights[1]).toBeGreaterThan(restingHeights[1]);
  expect(await notesField.evaluate((element) => element.scrollHeight - element.clientHeight)).toBeLessThanOrEqual(1);
  await heading.click();
  await expect(editNotes).toHaveJSProperty("textContent", longNotes);
  expect(await heights()).toEqual(expandedHeights);
  expect(await editNotes.locator("..").evaluate((element) => element.scrollHeight - element.clientHeight)).toBeLessThanOrEqual(1);

  // Remount the demo to verify the onUpdate callback reached its parent.
  await sample.getByRole("tab", { name: /Code/ }).click();
  await sample.getByRole("tab", { name: /Preview/ }).click();
  await expect(editNotes).toHaveJSProperty("textContent", longNotes);

  await editNotes.click();
  await expect(notesField).toBeFocused();
  expect(await heights()).toEqual(expandedHeights);
  await notesField.fill("Short note");
  expect(await heights()).toEqual(restingHeights);
  await notesField.press("Escape");
  expect(await heights()).toEqual(expandedHeights);

  await editTitle.click();
  await titleField.fill("");
  await titleField.press("Tab");
  await expect(editTitle).toHaveText("");
  await editTitle.click();
  await expect(titleField).toBeFocused();
});

for (const style of ["material", "material3", "fluent", "carbon", "brutalist"]) {
  test(`inline fields keep the ${style} focus borders and text height`, async ({ page }) => {
    await page.goto(`/?style=${style}&mode=light`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveClass(/\blight\b/, { timeout: 15000 });
    await expect(page.locator("#style-sel")).toHaveValue(style);

    const sample = page.getByRole("heading", { name: "Inline Edit" }).locator("..");
    for (const [index, [tag, label]] of [["input", "Project title"], ["textarea", "Release notes"]].entries()) {
      const standard = page.locator(`.s-${tag}-${style}:not(.s-inline-edit-field) ${tag}:visible`).first();
      await standard.focus();
      await expect(standard).toBeFocused();
      const borders = await standard.evaluate(async (element) => {
        await Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
        const css = getComputedStyle(element);
        const edges = ["top", "right", "bottom", "left"].flatMap((side) =>
          ["width", "style", "color"].map((property) => `border-${side}-${property}`));
        const corners = ["top-left", "top-right", "bottom-left", "bottom-right"]
          .map((corner) => `border-${corner}-radius`);
        return Object.fromEntries([...edges, ...corners].map((name) => [name, css.getPropertyValue(name)]));
      });

      const inline = sample.locator(".s-inline-edit").nth(index);
      const trigger = inline.getByRole("button", { name: new RegExp(`^Edit ${label}`) });
      const height = (await inline.boundingBox()).height;
      await trigger.press("Enter");
      const field = inline.getByRole("textbox", { name: label });
      await expect(field).toBeFocused();
      for (const [name, value] of Object.entries(borders)) {
        await expect(field).toHaveCSS(name, value);
      }
      expect((await inline.boundingBox()).height).toBe(height);

      if (tag === "textarea") {
        await field.fill(`${"Text that wraps. ".repeat(35)}\nLast line\n`);
        const expanded = (await inline.boundingBox()).height;
        expect(expanded).toBeGreaterThan(height);
        expect(await field.evaluate((element) => element.scrollHeight - element.clientHeight)).toBeLessThanOrEqual(1);
        await field.press("Tab");
        await expect(trigger).toBeVisible();
        expect((await inline.boundingBox()).height).toBe(expanded);
      } else {
        await field.press("Escape");
      }
    }
  });
}

test("both inline editors share the standard Input glass style and keep their padded height", async ({ page }) => {
  await page.goto("/?style=liquid-glass&mode=light", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\blight\b/, { timeout: 15000 });
  await expect(page.locator("#style-sel")).toHaveValue("liquid-glass");

  const standard = page.locator(".s-input-liquid-glass .s-input-field:visible").first();
  await standard.locator("input").focus();
  await expect(standard).toHaveCSS("background-color", "rgba(255, 255, 255, 0.18)");
  const glass = await standard.evaluate(async (element) => {
    await Promise.allSettled(element.getAnimations().map((animation) => animation.finished));
    const style = getComputedStyle(element);
    const properties = ["backdrop-filter", "background-color", "border-radius", "border-top-color", "box-shadow"];
    return Object.fromEntries(properties.map((name) => [name, style.getPropertyValue(name)]));
  });
  expect(glass["backdrop-filter"]).toContain("blur(24px)");

  const sample = page.getByRole("heading", { name: "Inline Edit" }).locator("..");
  for (const [index, label] of ["Project title", "Release notes"].entries()) {
    const inline = sample.locator(".s-inline-edit-liquid-glass").nth(index);
    const paragraph = inline.getByRole("button", { name: new RegExp(`^Edit ${label}`) });
    const field = inline.getByRole("textbox", { name: label });
    await expect(paragraph).toHaveCSS("padding-top", "13px");
    await expect(paragraph).toHaveCSS("padding-left", "19px");
    const height = (await inline.boundingBox()).height;
    await paragraph.click();
    await expect(field).toBeFocused();
    await expect(field).toHaveCSS("padding-top", "12px");
    await expect(field).toHaveCSS("padding-left", "18px");

    const surface = inline.locator(".s-inline-edit-field");
    for (const [name, value] of Object.entries(glass)) {
      await expect(surface).toHaveCSS(name, value);
    }
    expect((await surface.boundingBox()).height).toBe(height);
    if (index === 1) {
      await field.fill("First line\nSecond line\nThird line\nFourth line\n");
      expect((await surface.boundingBox()).height).toBeGreaterThan(height);
      expect(await field.evaluate((element) => element.scrollHeight - element.clientHeight)).toBeLessThanOrEqual(1);
    }
    await field.press("Escape");
    await expect(paragraph).toBeFocused();
    expect((await inline.boundingBox()).height).toBe(height);
  }
});
