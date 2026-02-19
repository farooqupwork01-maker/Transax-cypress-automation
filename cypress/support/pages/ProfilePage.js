class ProfilePage {
  // Selectors
  elements = {
    profileHeader: () => cy.get('[data-cy=profile-header]'),
    userName: () => cy.get('[data-cy=user-name]'),
    userEmail: () => cy.get('[data-cy=user-email]'),
    editProfileButton: () => cy.get('[data-cy=edit-profile-button]'),
    nameInput: () => cy.get('[data-cy=name-input]'),
    phoneInput: () => cy.get('[data-cy=phone-input]'),
    emailInput: () => cy.get('[data-cy=email-input]'),
    saveProfileButton: () => cy.get('[data-cy=save-profile-button]'),
    successMessage: () => cy.get('[data-cy=success-message]'),
    emailError: () => cy.get('[data-cy=email-error]'),
    changePasswordButton: () => cy.get('[data-cy=change-password-button]'),
    currentPassword: () => cy.get('[data-cy=current-password]'),
    newPassword: () => cy.get('[data-cy=new-password]'),
    confirmPassword: () => cy.get('[data-cy=confirm-password]'),
    submitPasswordButton: () => cy.get('[data-cy=submit-password-button]'),
    passwordError: () => cy.get('[data-cy=password-error]'),
    uploadPictureButton: () => cy.get('[data-cy=upload-picture-button]'),
    fileInput: () => cy.get('[data-cy=file-input]'),
    savePictureButton: () => cy.get('[data-cy=save-picture-button]'),
    profilePicture: () => cy.get('[data-cy=profile-picture]'),
    accountSettings: () => cy.get('[data-cy=account-settings]'),
    twoFactorAuth: () => cy.get('[data-cy=two-factor-auth]'),
    notificationPreferences: () => cy.get('[data-cy=notification-preferences]'),
    enable2faButton: () => cy.get('[data-cy=enable-2fa-button]'),
    twoFactorModal: () => cy.get('[data-cy=2fa-modal]'),
    confirm2faButton: () => cy.get('[data-cy=confirm-2fa-button]')
  }

  // Actions
  visit() {
    cy.visit('/profile')
  }

  clickEditProfile() {
    this.elements.editProfileButton().click()
  }

  updateName(name) {
    this.elements.nameInput().clear().type(name)
  }

  updatePhone(phone) {
    this.elements.phoneInput().clear().type(phone)
  }

  updateEmail(email) {
    this.elements.emailInput().clear().type(email)
  }

  saveProfile() {
    this.elements.saveProfileButton().click()
  }

  updateProfile(profileData) {
    this.clickEditProfile()
    if (profileData.name) this.updateName(profileData.name)
    if (profileData.phone) this.updatePhone(profileData.phone)
    if (profileData.email) this.updateEmail(profileData.email)
    this.saveProfile()
  }

  clickChangePassword() {
    this.elements.changePasswordButton().click()
  }

  enterCurrentPassword(password) {
    this.elements.currentPassword().type(password)
  }

  enterNewPassword(password) {
    this.elements.newPassword().type(password)
  }

  enterConfirmPassword(password) {
    this.elements.confirmPassword().type(password)
  }

  submitPasswordChange() {
    this.elements.submitPasswordButton().click()
  }

  changePassword(passwordData) {
    this.clickChangePassword()
    this.enterCurrentPassword(passwordData.currentPassword)
    this.enterNewPassword(passwordData.newPassword)
    this.enterConfirmPassword(passwordData.confirmPassword)
    this.submitPasswordChange()
  }

  uploadProfilePicture(filePath) {
    this.elements.uploadPictureButton().click()
    this.elements.fileInput().selectFile(filePath, { force: true })
    this.elements.savePictureButton().click()
  }

  enableTwoFactorAuth() {
    this.elements.enable2faButton().click()
    this.elements.confirm2faButton().click()
  }

  // Assertions
  verifyProfilePage() {
    this.elements.profileHeader().should('be.visible')
    this.elements.userName().should('be.visible')
    this.elements.userEmail().should('be.visible')
  }

  verifySuccessMessage(message) {
    this.elements.successMessage().should('contain', message)
  }

  verifyEmailError(message) {
    this.elements.emailError()
      .should('be.visible')
      .and('contain', message)
  }

  verifyPasswordError(message) {
    this.elements.passwordError()
      .should('be.visible')
      .and('contain', message)
  }

  verifyProfilePicture() {
    this.elements.profilePicture().should('be.visible')
  }

  verifyAccountSettings() {
    this.elements.accountSettings().should('be.visible')
    this.elements.twoFactorAuth().should('exist')
    this.elements.notificationPreferences().should('exist')
  }
}

export default ProfilePage
