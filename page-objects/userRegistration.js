import { expect } from "@playwright/test";
import { genericFunctions } from "./genericFunctions";

export class userRegistration {
  constructor(page) {
    this.page = page;
    this.generic = new genericFunctions(this.page);
  }

  async generateUserDetails() {
    const Name = await this.generic.randomNameGenerator();
    const Email = await this.generic.randomEmailGenerator();
    
    return { Name, Email };
}

  async verifyUserRegistration() {
    console.log("Verifying User Registration Page");
    await this.generic.clickOnElement("a[href='/login']");
    await this.generic.verifyElementText(".signup-form h2", "New User Signup!");

    const { Name, Email } = await this.generateUserDetails(); 

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
  async verifyNameandEmail(){

    const { Name, Email } = await this.generateUserDetails(); 

    const nameElement = this.page.locator('#name')
    const emailElement = this.page.locator('#email')

    expect(await nameElement.inputValue()).toBe(Name);
    expect(await emailElement.inputValue()).toBe(Email);

  }

}
