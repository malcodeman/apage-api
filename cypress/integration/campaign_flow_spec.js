import faker from 'faker';

describe('Campaign', () => {
  beforeEach(() => {
    cy.visit('https://campaign.sxdev.io/');
  });
  it('campaign flow', () => {
    //faker.locale = "de";
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      country: 'Germany',
      country_code: 'DE',
      phone_number: faker.phone.phoneNumberFormat(0),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_code: '+',
      postcode: faker.address.zipCode(),
      street: faker.address.streetName(),
      city: faker.address.city()
    };
    // Username
    cy.get('input._username')
      .type(user.username)
      .should('have.value', user.username);
    // Email
    cy.get('input._email')
      .type(user.email)
      .should('have.value', user.email);
    // Password
    cy.get('input._password')
      .type(user.password)
      .should('have.value', user.password);
    // Select Sweden as country
    cy.get('select._country')
      .select(user.country)
      .should('have.value', user.country_code);
    cy.get('input._tel')
      .clear()
      .type(user.phone_number)
      .should('have.value', user.phone_number);
    //cy.pause();

    cy.get('.f-signup__button').click();
    cy.wait(6000);
    cy.url().should('include', '/register/live-account');

    cy.get('select[name=addr_country]').contains(user.country);
    cy.get('input[name=first_name]')
      .type(user.first_name)
      .should('have.value', user.first_name);
    cy.get('input[name=last_name]')
      .type(user.last_name)
      .should('have.value', user.last_name);
    cy.get('input[name=phone_code]')
      .clear()
      .type(user.phone_code);
    cy.get('input[name=telephone]').type(
      Cypress.env('twilio_test_phone_number')
    );

    // Needs to click twice
    cy.get('[data-cy=form-next-step-btn]').click();
    cy.get('[data-cy=form-next-step-btn]').click();

    // Verify phone modal

    cy.get('[data-cy=verify-phone-btn]').click();
    cy.get('input[name=sms_code]').type(
      Cypress.env('twilio_test_verification_code')
    );
    cy.get('[data-cy=confirm-verification-code-btn]').click();

    // Personal details

    cy.get('input[name=addr_zip]').type(user.postcode);
    cy.get('input[name=addr_street]').type(user.street);
    cy.get('input[name=addr_city]').type(user.city);

    cy.get('[data-cy=form-next-step-btn]').click();
  });
});
