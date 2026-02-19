class SettingsPage {
  // Selectors
  elements = {
    settingsHeader: () => cy.get('[data-cy=settings-header]'),
    settingsMenu: () => cy.get('[data-cy=settings-menu]'),
    notificationsTab: () => cy.get('[data-cy=notifications-tab]'),
    emailNotificationsToggle: () => cy.get('[data-cy=email-notifications-toggle]'),
    smsNotificationsToggle: () => cy.get('[data-cy=sms-notifications-toggle]'),
    saveSettingsButton: () => cy.get('[data-cy=save-settings-button]'),
    successMessage: () => cy.get('[data-cy=success-message]'),
    securityTab: () => cy.get('[data-cy=security-tab]'),
    sessionTimeout: () => cy.get('[data-cy=session-timeout]'),
    require2fa: () => cy.get('[data-cy=require-2fa]'),
    preferencesTab: () => cy.get('[data-cy=preferences-tab]'),
    defaultCurrency: () => cy.get('[data-cy=default-currency]'),
    dateFormat: () => cy.get('[data-cy=date-format]'),
    apiKeysTab: () => cy.get('[data-cy=api-keys-tab]'),
    apiKeysList: () => cy.get('[data-cy=api-keys-list]'),
    generateApiKeyButton: () => cy.get('[data-cy=generate-api-key-button]'),
    apiKeyNameInput: () => cy.get('[data-cy=api-key-name-input]'),
    createApiKeyButton: () => cy.get('[data-cy=create-api-key-button]'),
    apiKeyValue: () => cy.get('[data-cy=api-key-value]'),
    apiKeyItem: () => cy.get('[data-cy=api-key-item]'),
    deleteApiKeyButton: () => cy.get('[data-cy=delete-api-key-button]'),
    confirmDeleteButton: () => cy.get('[data-cy=confirm-delete-button]'),
    dataExportTab: () => cy.get('[data-cy=data-export-tab]'),
    exportDataButton: () => cy.get('[data-cy=export-data-button]'),
    devicesTab: () => cy.get('[data-cy=devices-tab]'),
    devicesList: () => cy.get('[data-cy=devices-list]'),
    deviceItem: () => cy.get('[data-cy=device-item]'),
    revokeButton: () => cy.get('[data-cy=revoke-button]'),
    confirmRevokeButton: () => cy.get('[data-cy=confirm-revoke-button]')
  }

  // Actions
  visit() {
    cy.visit('/settings')
  }

  clickNotificationsTab() {
    this.elements.notificationsTab().click()
  }

  toggleEmailNotifications() {
    this.elements.emailNotificationsToggle().click()
  }

  toggleSmsNotifications() {
    this.elements.smsNotificationsToggle().click()
  }

  saveSettings() {
    this.elements.saveSettingsButton().click()
  }

  updateNotificationPreferences() {
    this.clickNotificationsTab()
    this.toggleEmailNotifications()
    this.toggleSmsNotifications()
    this.saveSettings()
  }

  clickSecurityTab() {
    this.elements.securityTab().click()
  }

  selectSessionTimeout(timeout) {
    this.elements.sessionTimeout().select(timeout)
  }

  requireTwoFactorAuth() {
    this.elements.require2fa().check()
  }

  updateSecuritySettings(settings) {
    this.clickSecurityTab()
    if (settings.sessionTimeout) this.selectSessionTimeout(settings.sessionTimeout)
    if (settings.require2fa) this.requireTwoFactorAuth()
    this.saveSettings()
  }

  clickPreferencesTab() {
    this.elements.preferencesTab().click()
  }

  selectDefaultCurrency(currency) {
    cy.selectDropdownOption('[data-cy=default-currency]', currency)
  }

  selectDateFormat(format) {
    this.elements.dateFormat().select(format)
  }

  updatePreferences(preferences) {
    this.clickPreferencesTab()
    if (preferences.currency) this.selectDefaultCurrency(preferences.currency)
    if (preferences.dateFormat) this.selectDateFormat(preferences.dateFormat)
    this.saveSettings()
  }

  clickApiKeysTab() {
    this.elements.apiKeysTab().click()
  }

  generateApiKey(name) {
    this.elements.generateApiKeyButton().click()
    this.elements.apiKeyNameInput().type(name)
    this.elements.createApiKeyButton().click()
  }

  deleteApiKey(index = 0) {
    this.elements.apiKeyItem().eq(index).find(this.elements.deleteApiKeyButton()).click()
    this.elements.confirmDeleteButton().click()
  }

  clickDataExportTab() {
    this.elements.dataExportTab().click()
  }

  exportAccountData() {
    this.elements.exportDataButton().click()
  }

  clickDevicesTab() {
    this.elements.devicesTab().click()
  }

  revokeDeviceAccess(index = 0) {
    this.elements.deviceItem().eq(index).find(this.elements.revokeButton()).click()
    this.elements.confirmRevokeButton().click()
  }

  // Assertions
  verifySettingsPage() {
    this.elements.settingsHeader().should('be.visible')
    this.elements.settingsMenu().should('be.visible')
  }

  verifySuccessMessage(message) {
    this.elements.successMessage().should('be.visible')
    if (message) {
      this.elements.successMessage().should('contain', message)
    }
  }

  verifyApiKeysList() {
    this.elements.apiKeysList().should('exist')
  }

  verifyApiKeyGenerated() {
    this.elements.apiKeyValue().should('be.visible')
  }

  verifyDevicesList() {
    this.elements.devicesList().should('exist')
  }
}

export default SettingsPage
