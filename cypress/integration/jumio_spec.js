describe('Jumio', () => {
  beforeEach(() => {
    const usernameValue = Cypress.env('username_non_eu');
    const passwordValue = Cypress.env('password_non_eu');
    cy.login(usernameValue, passwordValue);
    cy.visit('/');
  });
  it('jumio success modal autologin btn', () => {
    cy.contains('Account Verification').click();
    cy.get('[data-cy=autologin-to-trader-btn]').click();
  });
  it('jumio success modal close btn', () => {
    cy.contains('Account Verification').click();
    cy.get('[data-cy=close-success-modal-btn]').click();
  });
});
