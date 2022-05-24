Cypress.Commands.add("login", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get('button[type="submit"]').click();
  cy.intercept("POST", "/api/auth").as("login");
  cy.wait("@login").its("response.statusCode").should("eq", 200);
});
