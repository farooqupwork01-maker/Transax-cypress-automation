import { DashboardPage } from '../support/pages'

describe('Transax Dashboard Tests', () => {
  const dashboardPage = new DashboardPage()

  beforeEach(() => {
    cy.login()
    dashboardPage.visit()
  })

  it('should display dashboard with all key elements', () => {
    dashboardPage.verifyDashboardElements()
  })

  it('should display account balance', () => {
    dashboardPage.verifyBalanceDisplayed()
  })

  it('should display recent transactions list', () => {
    dashboardPage.verifyRecentTransactions()
  })

  it('should navigate to transactions page from dashboard', () => {
    dashboardPage.clickViewAllTransactions()
    cy.url().should('include', '/transactions')
  })

  it('should display transaction statistics', () => {
    dashboardPage.verifyStatisticsDisplayed()
  })

  it('should refresh dashboard data', () => {
    cy.intercept('GET', '**/api/dashboard').as('dashboardData')
    dashboardPage.clickRefreshButton()
    cy.waitForApiResponse('dashboardData')
    dashboardPage.verifyBalanceDisplayed()
  })

  it('should display notifications if any', () => {
    dashboardPage.openNotifications()
    dashboardPage.verifyNotificationsDropdown()
  })

  it('should navigate to quick actions', () => {
    dashboardPage.clickQuickSend()
    cy.url().should('include', '/transactions/new')
  })

  it('should display chart with transaction trends', () => {
    dashboardPage.verifyChartDisplayed()
  })

  it('should filter dashboard by date range', () => {
    dashboardPage.selectDateRange('last-30-days')
    dashboardPage.verifyChartDisplayed()
  })
})
