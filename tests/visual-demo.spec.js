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
    await page.goto(`/?style=${style}&mode=${mode}`);

    // Ensure the demo picked up the URL params
    await expect(page.locator("#style-sel")).toHaveValue(style);
    await expect(page.locator("#mode-sel")).toHaveValue(mode);

    // Wait for a representative component to be present and visible
    const representative = page.locator('button.s-button').first();
    await expect(representative).toBeVisible();

    // Basic structural checks: every section heading is present
    const sections = [
      "Theme Editor",
      "Form Components",
      "Layout Components",
      "Navigation Components",
      "Data Display",
      "Feedback",
    ];
    for (const title of sections) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    // Take a full-page screenshot for visual review
    const screenshotName = `${testInfo.project.name}-${style}.png`;
    await page.screenshot({
      path: `test-results/screenshots/${screenshotName}`,
      fullPage: true,
    });

    // Ensure no console errors (warnings are okay)
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });
}
