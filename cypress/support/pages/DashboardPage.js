class DashboardPage {
  // Selectors
  elements = {
    dashboardHeader: () => cy.get('[data-cy=dashboard-header]'),
    balanceCard: () => cy.get('[data-cy=balance-card]'),
    balanceAmount: () => cy.get('[data-cy=balance-amount]'),
    balanceCurrency: () => cy.get('[data-cy=balance-currency]'),
    recentTransactions: () => cy.get('[data-cy=recent-transactions]'),
    transactionItem: () => cy.get('[data-cy=transaction-item]'),
    statisticsChart: () => cy.get('[data-cy=statistics-chart]'),
    viewAllTransactionsLink: () => cy.get('[data-cy=view-all-transactions-link]'),
    totalTransactions: () => cy.get('[data-cy=total-transactions]'),
    totalSent: () => cy.get('[data-cy=total-sent]'),
    totalReceived: () => cy.get('[data-cy=total-received]'),
    refreshButton: () => cy.get('[data-cy=refresh-button]'),
    notificationsBell: () => cy.get('[data-cy=notifications-bell]'),
    notificationsDropdown: () => cy.get('[data-cy=notifications-dropdown]'),
    quickSendButton: () => cy.get('[data-cy=quick-send-button]'),
    chartLegend: () => cy.get('[data-cy=chart-legend]'),
    dateRangeSelector: () => cy.get('[data-cy=date-range-selector]'),
    last30DaysOption: () => cy.get('[data-cy=last-30-days]')
  }

  // Actions
  visit() {
    cy.visit('/dashboard')
  }

  clickViewAllTransactions() {
    this.elements.viewAllTransactionsLink().click()
  }

  clickRefreshButton() {
    this.elements.refreshButton().click()
  }

  openNotifications() {
    this.elements.notificationsBell().click()
  }

  clickQuickSend() {
    this.elements.quickSendButton().click()
  }

  selectDateRange(range) {
    this.elements.dateRangeSelector().click()
    if (range === 'last-30-days') {
      this.elements.last30DaysOption().click()
    }
  }

  // Assertions
  verifyDashboardElements() {
    this.elements.dashboardHeader().should('be.visible')
    this.elements.balanceCard().should('be.visible')
    this.elements.recentTransactions().should('be.visible')
    this.elements.statisticsChart().should('be.visible')
  }

  verifyBalanceDisplayed() {
    this.elements.balanceAmount().should('be.visible')
    this.elements.balanceCurrency().should('be.visible')
  }

  verifyRecentTransactions() {
    this.elements.recentTransactions().within(() => {
      this.elements.transactionItem().should('have.length.at.least', 1)
    })
  }

  verifyStatisticsDisplayed() {
    this.elements.totalTransactions().should('be.visible')
    this.elements.totalSent().should('be.visible')
    this.elements.totalReceived().should('be.visible')
  }

  verifyNotificationsDropdown() {
    this.elements.notificationsDropdown().should('be.visible')
  }

  verifyChartDisplayed() {
    this.elements.statisticsChart().should('be.visible')
    this.elements.chartLegend().should('exist')
  }
}

export default DashboardPage
