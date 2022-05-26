class CreateService {
  getAddNewService() {
    return cy.get('[data-tourid="create-service-btn"]');
  }

  getServiceName() {
    return cy.get("#name");
  }

  getServiceVersion() {
    return cy.get("#version");
  }

  getServiceDescription() {
    return cy.get("#description");
  }

  getServiceCreateButton() {
    return cy.get('button[type="submit"]').should("contain", "Create");
  }

  verifyServiceCreatedMessage() {
    return cy.get(".message").should("contain", "Created Service");
  }

  verifyServiceTitle(service) {
    return cy.get('[data-testid="packageName"]').should("contain", service);
  }

  verifyCreateNewService() {
    return cy.get('[data-testid="title-create new service"]');
  }

  verifyCreateNewServiceDescription() {
    return cy.contains(
      "Create a service to manage and proxy an existing API or publish to a portal. Services contain one or more versions. "
    );
  }

  verifyAlertMessage() {
    return cy.get('div[role="alert"]');
  }
}

export default new CreateService();
