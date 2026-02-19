import { TransactionsPage } from '../support/pages'

describe('Transax Transaction Tests', () => {
  const transactionsPage = new TransactionsPage()

  beforeEach(() => {
    cy.login()
    transactionsPage.visit()
  })

  it('should display transactions page', () => {
    transactionsPage.verifyTransactionsPage()
  })

  it('should create a new transaction successfully', () => {
    cy.fixture('transactions').then((transactions) => {
      cy.intercept('POST', '**/api/transactions').as('createTransaction')
      transactionsPage.createTransaction(transactions.validTransaction)
      
      cy.waitForApiResponse('createTransaction')
      transactionsPage.verifySuccessMessage()
      transactionsPage.verifyTransactionStatus('Completed')
    })
  })

  it('should validate required fields in transaction form', () => {
    transactionsPage.clickNewTransaction()
    transactionsPage.submitTransaction()
    transactionsPage.verifyValidationErrors()
  })

  it('should show error for invalid amount', () => {
    transactionsPage.clickNewTransaction()
    transactionsPage.enterAmount('0')
    transactionsPage.submitTransaction()
    transactionsPage.verifyAmountError('Amount must be greater than 0')
  })

  it('should filter transactions by date range', () => {
    transactionsPage.filterByDateRange('2024-01-01', '2024-12-31')
    transactionsPage.verifyFilteredTransactions()
  })

  it('should search transactions by recipient', () => {
    transactionsPage.searchTransactions('test@example.com')
    
    transactionsPage.elements.transactionItem().each(($item) => {
      cy.wrap($item).should('contain', 'test@example.com')
    })
  })

  it('should display transaction details', () => {
    transactionsPage.clickTransactionItem(0)
    transactionsPage.verifyTransactionDetails()
  })

  it('should cancel a pending transaction', () => {
    transactionsPage.cancelPendingTransaction()
    transactionsPage.verifySuccessMessage('Transaction cancelled')
  })

  it('should export transactions to CSV', () => {
    transactionsPage.exportToCSV()
    cy.readFile('cypress/downloads/transactions.csv').should('exist')
  })
})
