import Service from "../pages/service.page";

const randomstring = require("randomstring");

const email = Cypress.env("EMAIL");
const password = Cypress.env("PASSWORD");
let serviceName;
describe("Add new Service Page", () => {
  it("should be able to create new Service", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    cy.intercept("POST", "/api/service_packages/service_versions").as(
      "createService"
    );
    cy.visit("/");
    cy.login(email, password);
    Service.getAddNewService().click();
    Service.verifyCreateNewService().should("be.visible");
    Service.verifyCreateNewServiceDescription().should("be.visible");
    Service.getServiceName().type(serviceName);
    Service.getServiceVersion().type(`${serviceName}-version`);
    Service.getServiceDescription().type(`${serviceName}-description`);
    Service.getServiceCreateButton().click();
    cy.wait("@createService").its("response.statusCode").should("eq", 201);
    Service.verifyServiceCreatedMessage();
    Service.verifyServiceTitle(serviceName);
  });
});
