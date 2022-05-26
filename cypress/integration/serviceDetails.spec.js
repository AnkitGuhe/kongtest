import Service from "../pages/service.page";

const randomstring = require("randomstring");

const email = Cypress.env("EMAIL");
const password = Cypress.env("PASSWORD");
let serviceName;
describe("Add new Service Page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.visit("/");
    cy.login(email, password);
  });
  it("should be able to verify new Service page", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    cy.createNewService(serviceName);
    Service.getSearchBar(serviceName).type(serviceName);
    Service.getSearchResults(serviceName).click();
    cy.url().should("contain", "/overview");
    Service.getServiceHeaders(serviceName).should("be.visible");
    Service.getServiceDescription().should(
      "contain",
      `${serviceName}-description`
    );
    Service.getServiceActionMenu().should("be.visible");
    Service.getServiceOverview().should("be.visible");
    Service.getServiceVersion().should("be.visible");
  });
});
