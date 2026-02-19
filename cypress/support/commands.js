// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (username, password) => {
  const user = username || Cypress.env('VALID_USERNAME')
  const pass = password || Cypress.env('VALID_PASSWORD')
  
  cy.session([user, pass], () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type(user)
    cy.get('[data-cy=password]').type(pass)
    cy.get('[data-cy=login-button]').click()
    cy.url().should('include', '/dashboard')
  })
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=logout-button]').click()
  cy.url().should('include', '/login')
})

Cypress.Commands.add('waitForApiResponse', (alias) => {
  cy.wait(`@${alias}`, { timeout: 10000 })
})

Cypress.Commands.add('selectDropdownOption', (selector, optionText) => {
  cy.get(selector).click()
  cy.contains(optionText).click()
})

Cypress.Commands.add('verifyTransactionStatus', (status) => {
  cy.get('[data-cy=transaction-status]').should('contain', status)
})

// Type definitions for TypeScript (if using TS)
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      logout(): Chainable<void>
      waitForApiResponse(alias: string): Chainable<void>
      selectDropdownOption(selector: string, optionText: string): Chainable<void>
      verifyTransactionStatus(status: string): Chainable<void>
    }
  }
}

export {}
