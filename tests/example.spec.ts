import { test, expect } from "@playwright/test";

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

test("should display greeting", async ({ page, context }) => {
  await page.route("**/drones/healthcheck", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify("okoko"),
    });
  });

  // page = await context.newPage();
  await page.goto("http://localhost:5173/");
  wait(2);

  const greetingButton = await page.waitForSelector('[data-testid="greeting"]');
  const greetingText = await greetingButton.textContent();

  expect(greetingText).toMatch(/greeting is hello world/);
});
