import { expect } from "@playwright/test";
import { genericFunctions } from "./genericFunctions";

export class userRegistration {
  constructor(page) {
    this.page = page;
    this.generic = new genericFunctions(this.page);
    this.userDetails = null;
  }

  async generateUserDetails() {
    const Name = await this.generic.randomNameGenerator();
    const Email = await this.generic.randomEmailGenerator();
    const Password = await this.generic.randomPasswordGenerator();
    const Company = await this.generic.randomCompanyNameGenerator();
    const Address = await this.generic.randomAddressGenerator();
    const State = await this.generic.randomStateGenerator();
    const City = await this.generic.randomCityGenerator();
    const ZipCode = await this.generic.randomZipCodeGenerator();
    const PhoneNumber = await this.generic.randomPhoneNumberGenerator();

    return { Name, Email, Password, Company, Address, State, City, ZipCode, PhoneNumber };
  }

  async verifyUserRegistration() {
    console.log("Verifying User Registration Page");
    await this.generic.clickOnElement("a[href='/login']");
    await this.generic.verifyElementText(".signup-form h2", "New User Signup!");
    this.userDetails = await this.generateUserDetails();
    const { Name, Email } = this.userDetails;

    const NameElement = await this.page.getByPlaceholder("Name");
    await NameElement.type(Name);

    const EmailElement = await this.page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    await EmailElement.type(Email);

    const nameValueafterTyping = await NameElement.inputValue();
    const emailValueafterTyping = await EmailElement.inputValue();

    expect(nameValueafterTyping).toBe(Name);
    expect(emailValueafterTyping).toBe(Email);

    await NameElement.screenshot({
      path: "screenshots/HomePage/Nametxtbox.png",
    });

    await EmailElement.screenshot({
      path: "screenshots/HomePage/Emailtxtbox.png",
    });

    await this.page.locator("button", { hasText: "Signup" }).click();
    await expect(this.page.locator(".login-form")).toBeVisible();

    //verify the Enter Account Information heading
    const AccountInformationtxt = this.page.locator(".login-form h2").first();
    await expect(AccountInformationtxt).toHaveText("Enter Account Information");
  }

  async selectSex(option) {
    let sexValue;

    if (option === "Male") {
      sexValue = "Mr.";
    } else if (option === "Female") {
      sexValue = "Mrs.";
    } else {
      throw new Error(
        `Invalid option: ${option}. Expected "Male" or "Female".`
      );
    }
    await this.page.getByRole("radio", { name: `${sexValue}` }).click();
  }

  //This function verifies the Name and Email values which was entered before are correctly showing in the textboxes
  async verifyNameandEmail() {
    const { Name, Email } = this.userDetails;

    const nameElement = this.page.locator("#name");
    const emailElement = this.page.locator("#email");

    await expect(emailElement).toHaveAttribute("disabled", "disabled");
    expect(await nameElement.inputValue()).toBe(Name);
    expect(await emailElement.inputValue()).toBe(Email);
  }

  async fecthFirstNameandLastName() {
    const { Name } = this.userDetails;
    const firstName = Name.split(" ")[0];
    const lastName = Name.split(" ")[1];
    return { firstName, lastName };
  }

  async enterFirstNameandLastName() {
    const { firstName, lastName } = await this.fecthFirstNameandLastName();
    const firstNameElement = this.page.locator("#first_name");
    const lastNameElement = this.page.locator("#last_name");

    await firstNameElement.type(firstName);
    await lastNameElement.type(lastName);

    expect(await firstNameElement.inputValue()).toBe(firstName);
    expect(await lastNameElement.inputValue()).toBe(lastName);
  }

  async enterCompanyName() {
    const { Company } = this.userDetails;
    const companyElement = this.page.locator("#company");
    await companyElement.type(Company);
    expect(await companyElement.inputValue()).toBe(Company);
  }

  async enterAddress() {
    const { Address } = this.userDetails;
    const AddressElement = this.page.locator("#address1");
    await AddressElement.type(Address);
    expect(await AddressElement.inputValue()).toBe(Address);
  }

  async enterState() {
    const { State } = this.userDetails;
    const StateElement = this.page.locator("#state");
    await StateElement.type(State);
    expect(await StateElement.inputValue()).toBe(State);
  }

  async enterCity() {
    const { City } = this.userDetails;
    const CityElement = this.page.locator("#city");
    await CityElement.type(City);
    expect(await CityElement.inputValue()).toBe(City);
  }

  async enterZipCode() {
    const { ZipCode } = this.userDetails;
    const ZipCodeElement = this.page.locator("#zipcode");
    await ZipCodeElement.type(ZipCode);
    expect(await ZipCodeElement.inputValue()).toBe(ZipCode);
  }

  async enterPhoneNumber() {
    const { PhoneNumber } = this.userDetails;
    const PhoneNumberElement = this.page.locator("#mobile_number");
    await PhoneNumberElement.type(PhoneNumber);
    expect(await PhoneNumberElement.inputValue()).toBe(PhoneNumber);
  }

  async clickCreateAccountButton() {
    const createNewAccountBtn = await this.page.locator("button[data-qa='create-account']");
    await createNewAccountBtn.click();
  }

  async enterAndVerifyPassword() {
    const { Password } = this.userDetails;
    const passwordElement = this.page.locator("#password");
    await passwordElement.type(Password);
    expect(await passwordElement.inputValue()).toBe(Password);
  }

  async enterBirthInformation(Day, Month, Year) {
    await this.page.selectOption("select#days", Day);
    await this.page.selectOption("select#months", Month);
    await this.page.selectOption("select#years", Year);
  }

  async selectNewsletterSubscription(confirmation) {
    const newsletterCheckbox = this.page.locator("#newsletter");

    if (confirmation === true) {
      await newsletterCheckbox.check();
      await newsletterCheckbox.isChecked();
    } else {
      await expect(newsletterCheckbox).not.toBeChecked();
    }
  }

  async selectOffers(confirmation) {
    const OffersCheckbox = this.page.locator("#optin");

    if (confirmation === true) {
      await OffersCheckbox.check();
      await OffersCheckbox.isChecked();
    } else {
      await expect(OffersCheckbox).not.toBeChecked();
    }
  }
}
