class LoginPage {
  getEmail(email) {
    return cy.get("#email").type(email);
  }

  getPassword(password) {
    return cy.get("#password").type(password);
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  getForgotPasswordButton() {
    return cy.get('a[href="/forgot-password"]');
  }

  verifyLogin(email) {
    return cy
      .get(".profile-dropdown")
      .should("be.visible")
      .should("contain", email);
  }

  veriyLoginError() {
    return cy
      .get('[data-testid="unauthenticated-message"]')
      .should("contain", "Incorrect username or password. Please try again.");
  }

  verifyRecoveryPasswordPage() {
    return cy.contains(
      " Enter your verified email address and we will send you a password reset link. "
    );
  }
}

export default new LoginPage();
