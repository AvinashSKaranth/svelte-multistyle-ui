import { expect, test } from "@playwright/test";

test("the Mermaid gallery renders live source, reports errors and recovers", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/\b(?:light|dark)\b/, { timeout: 15000 });
  await page.getByRole("tablist", { name: "Component categories" }).getByRole("tab", { name: "Charts" }).click();

  const preview = page.getByRole("figure", { name: "Diagram preview" });
  const svg = preview.locator("svg").first();
  const source = page.getByRole("textbox", { name: "Mermaid source" });
  await expect(svg).toContainText("Approved?", { timeout: 15000 });

  await page.getByRole("combobox", { name: "Diagram example" }).selectOption("sequence");
  await expect(svg).toContainText("Confirm receipt");

  await source.fill("this is not a Mermaid diagram");
  await expect(preview.getByRole("alert")).toBeVisible();
  await expect(svg).toHaveCount(0);

  await source.fill("flowchart LR\n  A[Draft] --> B[Publish]");
  await expect(svg).toContainText("Publish");
  await expect(preview.getByRole("alert")).toHaveCount(0);

  await source.fill("");
  await expect(preview).toContainText("No diagram source.");
});
