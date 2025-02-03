/**
 * @type {import('playwright').Page}
 */

import { expect } from "@playwright/test";

export class homePage {
  constructor(page) {
    this.page = page;
  }

  //HomePage Logo Verification
  async verifyHomePageLogo() {
    console.log("Verifying Home Page Logo");
    await this.page
      .locator("img[alt='Website for automation practice']")
      .isVisible();
    await this.page
      .locator("img[alt='Website for automation practice']")
      .screenshot({
        path: "screenshots/HomePage/homePageLogoVerification.png",
      });
    console.log("Home Page Logo Verified");
  }

  //HomePage Navigation Bar Verification
  async verifyHomePageNavBar() {
    console.log("Verifying Home Page Navigation Bar");
    await this.page.locator(".nav.navbar-nav").isVisible();
    await this.page
      .locator(".nav.navbar-nav")
      .screenshot({
        path: "screenshots/HomePage/homePageNavBarVerification.png",
      });

    const navBarItemCount = await this.page
      .locator(".nav.navbar-nav li")
      .count();
    if (navBarItemCount !== 8) {
      throw new Error(`Expected 8 nav bar items, but found ${navBarItemCount}`);
    }

    const navBarItems = await this.page.locator(".nav.navbar-nav li a").all();

    const expectedLinks = [
      "/",
      "/products",
      "/view_cart",
      "/login",
      "/test_cases",
      "/api_list",
      "https://www.youtube.com/c/AutomationExercise",
      "/contact_us",
    ];

    for (let index = 0; index < navBarItems.length; index++) {
      const actualLink = await navBarItems[index].getAttribute("href");
      expect(actualLink).toBe(expectedLinks[index]);
    }
    console.log("Home Page Navigation Bar Verified");
  }

  //Slider Container and Corousel Indicators Verification
  async verifySliderContainer() {
    const sliderContainer = this.page.locator(".col-sm-12");
    await sliderContainer.isVisible();
    await sliderContainer.screenshot({
      path: "screenshots/HomePage/sliderContainer.png",
    });

    const carousel_indicators = this.page.locator(".carousel-indicators li");
    const indicatorsCount = await carousel_indicators.count();

    for (let i = 0; i < indicatorsCount; i++) {
      (await expect(carousel_indicators.nth(i)).toBeVisible()) &&
        (await expect(carousel_indicators.nth(i)).toBeEnabled());
    }
    await expect(carousel_indicators).toHaveCount(3);
    const carousel_indicators_panel = this.page.locator(".carousel-indicators");
    await carousel_indicators_panel.screenshot({
      path: "screenshots/HomePage/carousel_indicators_panel.png",
    });

    const indicators = this.page.locator(".carousel-indicators li");
    let activeIndex = await indicators.evaluateAll((items) => {
      return items.findIndex((item) => item.classList.contains("active"));
    });

    console.log(`Verifying Active slide at step 1: ${activeIndex}`);
    expect(activeIndex).toBe(0);

    await this.page.screenshot({ path: `screenshots/HomePage/slide-1.png` });

    for (let i = 1; i < 3; i++) {
      await this.page.waitForTimeout(5000);

      activeIndex = await indicators.evaluateAll((items) => {
        return items.findIndex((item) => item.classList.contains("active"));
      });

      console.log(`Verifying Active slide at step ${i + 1}: ${activeIndex}`);
      expect(activeIndex).toBe(i);

      await this.page.screenshot({
        path: `screenshots/HomePage/slide-${i + 1}.png`,
      });
    }

    const sliderButtons = this.page.locator(".control-carousel.hidden-xs");
    await expect(sliderButtons).toHaveCount(2);

    const sliderButtonCount = await sliderButtons.count();
    for (let index = 0; index < sliderButtonCount; index++) {
      const buttomelement = sliderButtons.nth(index);
      if (index == 0) {
        await buttomelement.screenshot({
          path: "screenshots/HomePage/sliderButtonLeft.png",
        });
      } else {
        await buttomelement.screenshot({
          path: "screenshots/HomePage/sliderButtonRight.png",
        });
      }
    }
  }
  
  
}
