import { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

export class genericFunctions {
  constructor(page) {
    this.page = page;
  }

  async clickOnElement(locator) {
    console.log(`Clicking on Element: ${locator}`);
    const element = await this.page.locator(locator);
    await element.waitFor({ state: "visible", timeout: 10000 });
    await element.click();
  }

  async verifyElementText(locator, expectedText) {
    console.log(`Verifying Element Text: ${locator}`);
    const element = this.page.locator(locator);
    expect(await element.textContent()).toBe(expectedText);
  }

  async randomNameGenerator() {
    return faker.person.fullName();
  }

  async randomEmailGenerator() {
    return faker.internet.email();
  }

  async randomPasswordGenerator() {
    return faker.internet.password();
  }

  async randomCompanyNameGenerator() {
    return faker.company.name();
  }

  async randomAddressGenerator() {
    return faker.location.streetAddress();
  }

  async randomStateGenerator() {
    return faker.location.state();
  }

  async randomCityGenerator() {
    return faker.location.city();
  }

  async randomZipCodeGenerator() {
    return faker.location.zipCode();
  }

  async randomPhoneNumberGenerator() {
    return faker.phone.number();
  }
}
