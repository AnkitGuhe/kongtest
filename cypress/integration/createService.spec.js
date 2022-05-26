import createService from "../pages/createService.page";

const randomstring = require("randomstring");

const email = Cypress.env("EMAIL");
const password = Cypress.env("PASSWORD");
let serviceName;
describe("Add new Service Page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/service_packages/service_versions").as(
      "createService"
    );
    cy.intercept("POST", "/api/auth").as("login");

    cy.visit("/");
    cy.login(email, password);
  });

  it("should be able to create new Service", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    createService.getAddNewService().click();
    createService.verifyCreateNewService().should("be.visible");
    createService.verifyCreateNewServiceDescription().should("be.visible");
    createService.getServiceName().type(serviceName);
    createService.getServiceVersion().type(`${serviceName}-version`);
    createService.getServiceDescription().type(`${serviceName}-description`);
    createService.getServiceCreateButton().click();
    cy.wait("@createService").its("response.statusCode").should("eq", 201);
    createService.verifyServiceCreatedMessage();
    createService.verifyServiceTitle(serviceName);
  });

  it("should not be able to create new Service with existing name", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    cy.createNewService(serviceName).then((response) => {
      cy.log(response);

      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(serviceName);
      expect(response.body.description).to.eq(`${serviceName}-description`);
    });
    createService.getAddNewService().click();
    createService.verifyCreateNewService().should("be.visible");
    createService.verifyCreateNewServiceDescription().should("be.visible");
    createService.getServiceName().type(serviceName);
    createService.getServiceVersion().type(`${serviceName}-version`);
    createService.getServiceDescription().type(`${serviceName}-description`);
    createService.getServiceCreateButton().click();
    createService
      .verifyAlertMessage()
      .should(
        "have.text",
        `Key (org_id, name)=(ca3201f3-f73f-4119-b39b-09eabe186e3b, ${serviceName}) already exists.`
      );
  });

  it("should not be able to create new Service: No Service name", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    createService.getAddNewService().click();
    createService.verifyCreateNewService().should("be.visible");
    createService.verifyCreateNewServiceDescription().should("be.visible");
    createService.getServiceVersion().type(`${serviceName}-version`);
    createService.getServiceDescription().type(`${serviceName}-description`);
    createService.getServiceCreateButton().click();
    createService.getServiceName().then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });

  it("should be able to create new Service: No Service description", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    createService.getAddNewService().click();
    createService.verifyCreateNewService().should("be.visible");
    createService.verifyCreateNewServiceDescription().should("be.visible");
    createService.getServiceName().type(serviceName);
    createService.getServiceVersion().type(`${serviceName}-version`);
    createService.getServiceDescription();
    createService.getServiceCreateButton().click();
    cy.wait("@createService").its("response.statusCode").should("eq", 201);
    createService.verifyServiceCreatedMessage();
    createService.verifyServiceTitle(serviceName);
  });

  it("should not be able to create new Service: No Service Version", () => {
    serviceName = `cypress-test-${randomstring.generate(5)}`;
    createService.getAddNewService().click();
    createService.verifyCreateNewService().should("be.visible");
    createService.verifyCreateNewServiceDescription().should("be.visible");
    createService.getServiceName().type(serviceName);
    createService.getServiceDescription().type(`${serviceName}-description`);
    createService.getServiceCreateButton().click();
    createService.getServiceVersion().then(($input) => {
      expect($input[0].validationMessage).to.eq("Please fill out this field.");
    });
  });
});
