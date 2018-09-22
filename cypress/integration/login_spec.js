describe('Log In', () => {
  it('succesfully performs login action', () => {
    const usernameValue = Cypress.env('username_eu');
    const passwordValue = Cypress.env('password_eu');
    cy.visit('/');
    cy.get('input[name=user_name]')
      .type(usernameValue)
      .should('have.value', usernameValue);
    cy.get('input[name=password]')
      .type(passwordValue)
      .should('have.value', passwordValue);
    cy.get('[data-cy=login-btn]').click();
  });
});
