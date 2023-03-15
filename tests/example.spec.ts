import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.route("**/drones", async (route) => {
    await route.fulfill({ status: 200, body: "testtest123" });
  });

  await page.goto("http://127.0.0.1:5173");
  setTimeout(async () => {
    const button = await page.$('button:text("greeting is hello world")');

    expect(button).not.toBeFalsy();
  }, 5000);
  await page.screenshot({ path: "screenshot.png" });
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
