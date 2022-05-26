import Service from "../pages/createService.page";
import LoginPage from "../pages/login.page";

Cypress.Commands.add("login", (email, password) => {
  LoginPage.getEmail(email);
  LoginPage.getPassword(password);
  LoginPage.getLoginButton().click();
  cy.wait("@login").its("response.statusCode").should("eq", 200);
});

Cypress.Commands.add("createNewService", (servicename) => {
  cy.request({
    method: "POST",
    url: "https://konnect.konghq.com/api/service_packages/service_versions",
    Headers: {},
    body: {
      service_package: {
        name: servicename,
        description: `${servicename}-description`,
      },
      service_version: {
        version: `${servicename}-version`,
        control_plane: "8141bd4e-ef8d-483c-a6d8-01407caabf4c",
      },
    },
  }).then((response) => response);
});
