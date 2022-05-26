import Service from "../pages/service.page";

const randomstring = require("randomstring");

const email = Cypress.env("EMAIL");
const password = Cypress.env("PASSWORD");
let serviceName;
describe("Add new Service Page", () => {
  before(() => {
    cy.intercept("POST", "/api/auth").as("login");
    cy.intercept("DELETE", "/api/service_packages/**").as("deleteService");
  });
  beforeEach(() => {
    cy.visit("/");
    cy.login(email, password);
  });
  it("should be able to verify new Service page", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    cy.createNewService(serviceName);
    Service.getSearchBar(serviceName).type(serviceName);
    Service.getSearchResults(serviceName).click();
    Service.getServiceHeaders(serviceName).should("be.visible");
    Service.getServiceActionMenu().should("be.visible").click();
    Service.getDeleteServiceButton().click();
    Service.getConfirmDeleteServiceButton().click();
    cy.wait("@deleteService");
    Service.verifyServiceDeletedMessage().should("be.visible");
  });
});
