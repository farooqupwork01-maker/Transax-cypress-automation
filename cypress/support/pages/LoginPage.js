class LoginPage {
  // Selectors
  elements = {
    usernameInput: () => cy.get('[data-cy=username]'),
    passwordInput: () => cy.get('[data-cy=password]'),
    loginButton: () => cy.get('[data-cy=login-button]'),
    errorMessage: () => cy.get('[data-cy=error-message]'),
    usernameError: () => cy.get('[data-cy=username-error]'),
    passwordError: () => cy.get('[data-cy=password-error]')
  }

  // Actions
  visit() {
    cy.visit('/login')
  }

  enterUsername(username) {
    this.elements.usernameInput().clear().type(username)
  }

  enterPassword(password) {
    this.elements.passwordInput().clear().type(password)
  }

  clickLoginButton() {
    this.elements.loginButton().click()
  }

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLoginButton()
  }

  // Assertions
  verifyLoginPageElements() {
    this.elements.usernameInput().should('be.visible')
    this.elements.passwordInput().should('be.visible')
    this.elements.loginButton().should('be.visible')
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain', message)
  }

  verifyUsernameError(message) {
    this.elements.usernameError()
      .should('be.visible')
      .and('contain', message)
  }

  verifyPasswordError(message) {
    this.elements.passwordError()
      .should('be.visible')
      .and('contain', message)
  }

  verifySuccessfulLogin() {
    cy.url().should('include', '/dashboard')
  }
}

export default LoginPage
