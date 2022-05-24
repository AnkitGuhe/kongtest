import LoginPage from "../pages/login.page";

const email = Cypress.env("EMAIL");
const password = Cypress.env("PASSWORD");
describe("Login Page", () => {
  it("should be able to login", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getEmail(email);
    LoginPage.getPassword(password);
    LoginPage.getLoginButton().click();
    cy.wait("@login").its("response.statusCode").should("eq", 200);
    LoginPage.verifyLogin(email);
  });
  it("should not be able to login : Invalid email", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getEmail("Inavlid@invalid.com");
    LoginPage.getPassword(password);
    LoginPage.getLoginButton().click();
    cy.wait("@login").its("response.statusCode").should("eq", 401);
    LoginPage.veriyLoginError();
  });
  it("should not be able to login : no email address", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getPassword(password);
    LoginPage.getLoginButton().should("be.disabled");
  });
  it("should not be able to login : Invalid password", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getEmail(email);
    LoginPage.getPassword("password");
    LoginPage.getLoginButton().click();
    cy.wait("@login").its("response.statusCode").should("eq", 401);
    LoginPage.veriyLoginError();
  });
  it("should not be able to login : no password", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getEmail(email);
    LoginPage.getLoginButton().should("be.disabled");
  });
  it("should not be able to click forgot password", () => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    LoginPage.getForgotPasswordButton().click();
    LoginPage.verifyRecoveryPasswordPage().should("be.visible")
  });
});
