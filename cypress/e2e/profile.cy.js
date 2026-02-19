import { ProfilePage } from '../support/pages'

describe('Transax User Profile Tests', () => {
  const profilePage = new ProfilePage()

  beforeEach(() => {
    cy.login()
    profilePage.visit()
  })

  it('should display user profile information', () => {
    profilePage.verifyProfilePage()
  })

  it('should update user profile information', () => {
    const profileData = {
      name: 'Updated Name',
      phone: '+1234567890'
    }
    
    cy.intercept('PUT', '**/api/profile').as('updateProfile')
    profilePage.updateProfile(profileData)
    
    cy.waitForApiResponse('updateProfile')
    profilePage.verifySuccessMessage('Profile updated successfully')
  })

  it('should validate email format', () => {
    profilePage.clickEditProfile()
    profilePage.updateEmail('invalid-email')
    profilePage.saveProfile()
    profilePage.verifyEmailError('Invalid email format')
  })

  it('should change password successfully', () => {
    const passwordData = {
      currentPassword: 'OldPassword123!',
      newPassword: 'NewPassword123!',
      confirmPassword: 'NewPassword123!'
    }
    
    cy.intercept('POST', '**/api/change-password').as('changePassword')
    profilePage.changePassword(passwordData)
    
    cy.waitForApiResponse('changePassword')
    profilePage.verifySuccessMessage('Password changed successfully')
  })

  it('should show error if new passwords do not match', () => {
    const passwordData = {
      currentPassword: 'OldPassword123!',
      newPassword: 'NewPassword123!',
      confirmPassword: 'DifferentPassword123!'
    }
    
    profilePage.changePassword(passwordData)
    profilePage.verifyPasswordError('Passwords do not match')
  })

  it('should upload profile picture', () => {
    cy.intercept('POST', '**/api/upload-avatar').as('uploadAvatar')
    profilePage.uploadProfilePicture('cypress/fixtures/sample-image.jpg')
    
    cy.waitForApiResponse('uploadAvatar')
    profilePage.verifyProfilePicture()
  })

  it('should display account settings', () => {
    profilePage.verifyAccountSettings()
  })

  it('should enable two-factor authentication', () => {
    profilePage.enableTwoFactorAuth()
    profilePage.verifySuccessMessage('Two-factor authentication enabled')
  })
})
