class Service {
  getSearchBar(serviceName) {
    return cy.get('input[type="search"]');
  }

  getSearchResults(serviceName) {
    return cy
      .get("#autosuggest-autosuggest__results")
      .contains("div", "Service")
      .parent()
      .contains(serviceName);
  }

  getServiceHeaders(serviceName) {
    return cy.contains(serviceName);
  }

  getServiceDescription() {
    return cy.get('[data-testid="packageDescription"]');
  }

  getServiceActionMenu() {
    return cy.get('[data-testid="service-package-actions"]');
  }

  getServiceOverview() {
    return cy.get('[data-testid="menu-item-Overview"]');
  }

  getServiceVersion() {
    return cy.get('[data-testid="menu-item-Versions"]');
  }

  getDeleteServiceButton() {
    return cy.get('[data-testid="delete-service"]');
  }

  getConfirmDeleteServiceButton() {
    return cy.get('[data-testid="confirm-delete"]');
  }

  verifyServiceDeletedMessage() {
    return cy
      .get(".message")
      .should("contain", "Successfully deleted Service.");
  }
}

export default new Service();
