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

  test.only("Verify User Registration", async ({ page }) => {
    const user = new userRegistration(page);
    const day = "1";
    const month = "January";
    const year = "2003";
    const sex = "Female";

    await user.verifyUserRegistration();
    await user.selectSex(sex);
    await user.verifyNameandEmail();
    await user.enterAndVerifyPassword();
    await user.enterBirthInformation(day, month, year);
    await user.selectNewsletterSubscription(false);
    await user.selectOffers(true);
    await user.enterFirstNameandLastName();
    await user.enterCompanyName();
    await user.enterAddress();
    await user.enterState();
    await user.enterCity();
    await user.enterZipCode();
    await user.enterPhoneNumber();
    await user.clickCreateAccountButton();


  });
});