import { LoginPage } from '../support/pages'

describe('Transax Login Tests', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit()
  })

  it('should display login page elements', () => {
    loginPage.verifyLoginPageElements()
  })

  it('should login successfully with valid credentials', () => {
    const username = Cypress.env('VALID_USERNAME')
    const password = Cypress.env('VALID_PASSWORD')
    
    loginPage.login(username, password)
    loginPage.verifySuccessfulLogin()
    
    cy.fixture('users').then((users) => {
      cy.get('[data-cy=user-name]').should('contain', users.validUser.name)
    })
  })

  it('should show error message with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.invalidUser.username, users.invalidUser.password)
      loginPage.verifyErrorMessage('Invalid credentials')
    })
  })

  it('should show validation error for empty username', () => {
    loginPage.enterPassword('password123')
    loginPage.clickLoginButton()
    loginPage.verifyUsernameError('Username is required')
  })

  it('should show validation error for empty password', () => {
    cy.fixture('users').then((users) => {
      loginPage.enterUsername(users.validUser.username)
      loginPage.clickLoginButton()
      loginPage.verifyPasswordError('Password is required')
    })
  })

  it('should remember user session after page refresh', () => {
    cy.login()
    cy.reload()
    cy.url().should('include', '/dashboard')
  })

  it('should logout successfully', () => {
    cy.login()
    cy.logout()
    cy.url().should('include', '/login')
  })
})
