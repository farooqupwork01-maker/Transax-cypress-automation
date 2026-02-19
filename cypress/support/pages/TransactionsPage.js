class TransactionsPage {
  // Selectors
  elements = {
    transactionsHeader: () => cy.get('[data-cy=transactions-header]'),
    transactionList: () => cy.get('[data-cy=transaction-list]'),
    transactionItem: () => cy.get('[data-cy=transaction-item]'),
    newTransactionButton: () => cy.get('[data-cy=new-transaction-button]'),
    amountInput: () => cy.get('[data-cy=amount-input]'),
    currencySelect: () => cy.get('[data-cy=currency-select]'),
    recipientInput: () => cy.get('[data-cy=recipient-input]'),
    descriptionInput: () => cy.get('[data-cy=description-input]'),
    submitTransactionButton: () => cy.get('[data-cy=submit-transaction-button]'),
    successMessage: () => cy.get('[data-cy=success-message]'),
    transactionStatus: () => cy.get('[data-cy=transaction-status]'),
    amountError: () => cy.get('[data-cy=amount-error]'),
    recipientError: () => cy.get('[data-cy=recipient-error]'),
    dateFilterStart: () => cy.get('[data-cy=date-filter-start]'),
    dateFilterEnd: () => cy.get('[data-cy=date-filter-end]'),
    applyFilterButton: () => cy.get('[data-cy=apply-filter-button]'),
    searchInput: () => cy.get('[data-cy=search-input]'),
    searchButton: () => cy.get('[data-cy=search-button]'),
    transactionDetails: () => cy.get('[data-cy=transaction-details]'),
    transactionAmount: () => cy.get('[data-cy=transaction-amount]'),
    transactionDate: () => cy.get('[data-cy=transaction-date]'),
    cancelButton: () => cy.get('[data-cy=cancel-button]'),
    confirmCancelButton: () => cy.get('[data-cy=confirm-cancel-button]'),
    exportButton: () => cy.get('[data-cy=export-button]'),
    exportCsvOption: () => cy.get('[data-cy=export-csv-option]')
  }

  // Actions
  visit() {
    cy.visit('/transactions')
  }

  clickNewTransaction() {
    this.elements.newTransactionButton().click()
  }

  enterAmount(amount) {
    this.elements.amountInput().clear().type(amount)
  }

  selectCurrency(currency) {
    this.elements.currencySelect().select(currency)
  }

  enterRecipient(recipient) {
    this.elements.recipientInput().clear().type(recipient)
  }

  enterDescription(description) {
    this.elements.descriptionInput().clear().type(description)
  }

  submitTransaction() {
    this.elements.submitTransactionButton().click()
  }

  createTransaction(transactionData) {
    this.clickNewTransaction()
    this.enterAmount(transactionData.amount)
    this.selectCurrency(transactionData.currency)
    this.enterRecipient(transactionData.recipient)
    this.enterDescription(transactionData.description)
    this.submitTransaction()
  }

  filterByDateRange(startDate, endDate) {
    this.elements.dateFilterStart().type(startDate)
    this.elements.dateFilterEnd().type(endDate)
    this.elements.applyFilterButton().click()
  }

  searchTransactions(searchTerm) {
    this.elements.searchInput().type(searchTerm)
    this.elements.searchButton().click()
  }

  clickTransactionItem(index = 0) {
    this.elements.transactionItem().eq(index).click()
  }

  cancelPendingTransaction() {
    this.elements.transactionItem()
      .contains('Pending')
      .parent()
      .find(this.elements.cancelButton())
      .click()
    this.elements.confirmCancelButton().click()
  }

  exportToCSV() {
    this.elements.exportButton().click()
    this.elements.exportCsvOption().click()
  }

  // Assertions
  verifyTransactionsPage() {
    this.elements.transactionsHeader().should('be.visible')
    this.elements.transactionList().should('exist')
  }

  verifySuccessMessage(message) {
    this.elements.successMessage().should('be.visible')
    if (message) {
      this.elements.successMessage().should('contain', message)
    }
  }

  verifyTransactionStatus(status) {
    this.elements.transactionStatus().should('contain', status)
  }

  verifyValidationErrors() {
    this.elements.amountError().should('be.visible')
    this.elements.recipientError().should('be.visible')
  }

  verifyAmountError(message) {
    this.elements.amountError()
      .should('be.visible')
      .and('contain', message)
  }

  verifyTransactionDetails() {
    this.elements.transactionDetails().should('be.visible')
    this.elements.transactionAmount().should('exist')
    this.elements.transactionStatus().should('exist')
    this.elements.transactionDate().should('exist')
  }

  verifyFilteredTransactions() {
    this.elements.transactionList().should('exist')
    this.elements.transactionItem().should('have.length.greaterThan', 0)
  }
}

export default TransactionsPage
