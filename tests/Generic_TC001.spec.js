// @ts-check
import { test, expect } from "@playwright/test";
import { suite } from "node:test";
import { homePage } from "../page-objects/homePage";
import { userRegistration } from "../page-objects/userRegistration";

suite("Automation Testing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.automationexercise.com/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Verify Home Page View", async ({ page }) => {
    const home = new homePage(page);
    await home.verifyHomePageLogo();
    await home.verifyHomePageNavBar();
    await home.verifySliderContainer();
  });

  test.only('Verify User Registration', async ({ page }) => {

    const user = new userRegistration(page);
    await user.verifyUserRegistration();
    await user.selectSex("Female");
  });
});
