import { test, expect } from "@playwright/test";

const styles = [
  "material",
  "material3",
  "fluent",
  "brutalist",
  "pixel",
  "neon",
  "metro",
  "bootstrap",
  "cartoon",
  "illustration",
  "carbon",
  "liquid-glass",
];

for (const style of styles) {
  test(`demo renders for style "${style}"`, async ({ page, colorScheme }, testInfo) => {
    const mode = colorScheme === "dark" ? "dark" : "light";
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(`/?style=${style}&mode=${mode}`, { waitUntil: "domcontentloaded" });

    // Ensure the demo picked up the URL params
    await expect(page.locator("#style-sel")).toHaveValue(style);
    await expect(page.locator("#mode-sel")).toHaveValue(mode);
    await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${mode}\\b`));

    // Wait for a representative component to be present and visible
    const representative = page.locator('button.s-button').first();
    await expect(representative).toBeVisible();

    // Take a full-page screenshot for visual review
    const screenshotName = `${testInfo.project.name}-${style}.png`;
    await page.screenshot({
      path: `test-results/screenshots/${screenshotName}`,
      fullPage: true,
    });

    await page.getByRole("button", { name: "Open theme settings" }).click();
    await expect(page.getByRole("heading", { name: "Theme Editor" })).toBeVisible();
    await page.getByRole("button", { name: "Close theme settings" }).click();
    const sections = [
      ["Layout", "Layout Components"],
      ["Navigation", "Navigation Components"],
      ["Data Display", "Data Display"],
      ["Feedback", "Feedback"],
      ["Form", "Form Components"],
    ];
    for (const [tab, heading] of sections) {
      await page.getByRole("tab", { name: tab, exact: true }).click();
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}
