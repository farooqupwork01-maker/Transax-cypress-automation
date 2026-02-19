import { SettingsPage } from '../support/pages'

describe('Transax Settings Tests', () => {
  const settingsPage = new SettingsPage()

  beforeEach(() => {
    cy.login()
    settingsPage.visit()
  })

  it('should display settings page', () => {
    settingsPage.verifySettingsPage()
  })

  it('should update notification preferences', () => {
    cy.intercept('PUT', '**/api/settings/notifications').as('updateNotifications')
    settingsPage.updateNotificationPreferences()
    
    cy.waitForApiResponse('updateNotifications')
    settingsPage.verifySuccessMessage()
  })

  it('should update security settings', () => {
    const securitySettings = {
      sessionTimeout: '30',
      require2fa: true
    }
    
    cy.intercept('PUT', '**/api/settings/security').as('updateSecurity')
    settingsPage.updateSecuritySettings(securitySettings)
    
    cy.waitForApiResponse('updateSecurity')
    settingsPage.verifySuccessMessage('Security settings updated')
  })

  it('should update currency preferences', () => {
    const preferences = {
      currency: 'EUR',
      dateFormat: 'DD/MM/YYYY'
    }
    
    cy.intercept('PUT', '**/api/settings/preferences').as('updatePreferences')
    settingsPage.updatePreferences(preferences)
    
    cy.waitForApiResponse('updatePreferences')
    settingsPage.verifySuccessMessage()
  })

  it('should display API keys section', () => {
    settingsPage.clickApiKeysTab()
    settingsPage.verifyApiKeysList()
  })

  it('should generate new API key', () => {
    cy.intercept('POST', '**/api/api-keys').as('generateApiKey')
    settingsPage.generateApiKey('Test API Key')
    
    cy.waitForApiResponse('generateApiKey')
    settingsPage.verifyApiKeyGenerated()
  })

  it('should delete API key with confirmation', () => {
    settingsPage.clickApiKeysTab()
    settingsPage.deleteApiKey(0)
    settingsPage.verifySuccessMessage('API key deleted')
  })

  it('should export account data', () => {
    settingsPage.clickDataExportTab()
    settingsPage.exportAccountData()
    cy.readFile('cypress/downloads/account-data.json').should('exist')
  })

  it('should display connected devices', () => {
    settingsPage.clickDevicesTab()
    settingsPage.verifyDevicesList()
  })

  it('should revoke device access', () => {
    settingsPage.clickDevicesTab()
    settingsPage.revokeDeviceAccess(0)
    settingsPage.verifySuccessMessage('Device access revoked')
  })
})
