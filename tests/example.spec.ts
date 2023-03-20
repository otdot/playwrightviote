import { test, expect } from "@playwright/test";

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

test("should display greeting", async ({ page, context }) => {
  page.on("request", (request) =>
    console.log(">>", request.method(), request.url())
  );
  page.on("response", (response) =>
    console.log("<<", response.status(), response.url(), response.body())
  );

  page.on("console", (msg) => console.log(msg.text()));

  await page.route("**/drones/healthcheck", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "cache-control": "no-cache" },
      body: JSON.stringify({ hello: "hello", test: "test" }),
    });
  });

  // page = await context.newPage();
  await page.goto("http://localhost:5173/");
  wait(2);

  const greetingButton = await page.waitForSelector('[data-testid="greeting"]');
  const greetingText = await greetingButton.textContent();

  expect(greetingText).toMatch(/greeting is hello/);
});
