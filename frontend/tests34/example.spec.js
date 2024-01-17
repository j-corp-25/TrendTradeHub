// @ts-check
const { test, expect } = require("@playwright/test");

const EMAIL = ["socket@email.com"];
const PASSWORD = ["password"];
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("login test with api request", async ({ request }) => {
  await request.post("http://localhost:3000/api/users/login", {
    data: { email: "socket@email.com", password: "password" },
  });

});

test("has title", async ({ page }) => {
  // await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TrendyTrend/);
});

test("product list in main page", async ({ page }) => {
  // await page.goto('http://localhost:3000/');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Products' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Product List" })
  ).toBeVisible();
});

test.describe("login user with correct credentials", () => {
  test("login page and sign in page available", async ({ page }) => {
    await page.getByRole("link", { name: "Log In" }).click();
    expect(page).toHaveURL("http://localhost:3000/login");

    // await expect(
    //   page.getByRole("button", { name: "Sign In" }).nth(1)
    // ).toBeVisible();

    await page.getByRole("button", { name: "Sign In" }).nth(1).click();

    await page
      .locator("form")
      .filter({ hasText: "Sign In" })
      .getByPlaceholder("Email")
      .fill(EMAIL[0]);
    await page
      .locator("form")
      .filter({ hasText: "Sign In" })
      .getByPlaceholder("Password")
      .fill(PASSWORD[0]);

    await page.locator("form").filter({ hasText: "Sign In" }).press("Enter");
    await expect(page.getByText("Log Out")).toBeVisible();
    await expect(page.getByText("Profile")).toBeVisible();
  });
});

test.describe("register user", () => {
  test("register page", async ({ page }) => {
    await page.getByRole("link", { name: "Log In" }).click();
  });
  test("fill out register form", async ({ page }) => {
    await page.getByRole("link", { name: "Log In" }).click();
    const register_form = page.locator("form").filter({ hasText: "Sign Up" });
    const number = Math.floor(Math.random() * 2000);

    const USER_INFO = {
      name: "Demo-Test",
      email: `Demo-Test${number}@email.com`,
      password: "password",
      password2: "password",
    };
    const name = page
      .locator("form")
      .filter({ hasText: "Create Account" })
      .getByPlaceholder("Name");
    const email = page
      .locator("form")
      .filter({ hasText: "Create Account" })
      .getByPlaceholder("Email");
    const password = page
      .locator("form")
      .filter({ hasText: "Create Account" })
      .getByPlaceholder("Password", { exact: true });
    const confirm_password = page
      .locator("form")
      .filter({ hasText: "Create Account" })
      .getByPlaceholder("Confirm Password", { exact: true });

    await name.fill(USER_INFO.name);
    await email.fill(USER_INFO.email);
    await password.fill(USER_INFO.password);
    await confirm_password.fill(USER_INFO.password2);

    await register_form.press("Enter");
  });
});

test.describe("error handling in forms", () => {
  test("login page", async ({ page }) => {
    const sign_in_form_button = page
      .locator("form")
      .filter({ hasText: "Sign InUse your email and" })
      .getByRole("button");
    await page.getByRole("link", { name: "Log In" }).click();
    await page.getByRole("button", { name: "Sign In" }).nth(1).click();
    await sign_in_form_button.click();
    await expect(page.getByText("Invalid credentials")).toBeVisible();
  });
});
