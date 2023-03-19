import { test, expect, firefox } from "@playwright/test";

test("should display greeting", async ({ page, context }) => {
  page = await context.newPage();
  await page.goto("http://localhost:5173/");

  const greetingButton = await page.waitForSelector('[data-testid="greeting"]');
  const greetingText = await greetingButton.textContent();

  expect(greetingText).toMatch(/greeting is .+/);
});
