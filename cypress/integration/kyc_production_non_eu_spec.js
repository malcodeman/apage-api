import faker from 'faker';

describe('KYC', () => {
  beforeEach(() => {
    cy.visit('https://my.naga.com');
  });
  it('kyc form non-eu', () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(10, true) + '32',
      country: 'Germany',
      country_code: 'DE',
      phone_number: faker.phone.phoneNumberFormat(0),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_code: Cypress.env('twilio_test_phone_code'),
      phone_number: Cypress.env('twilio_test_phone_number'),
      verification_code: Cypress.env('twilio_test_verification_code'),
      postcode: faker.random.number(),
      street: faker.address.streetName(),
      city: faker.address.city(),
      employer_name: 'test',
      profession: faker.name.jobDescriptor(),
      birth_day: String(faker.random.number({ min: 1, max: 10 })),
      birth_month: 'APR',
      birth_year: String(faker.random.number({ min: 1898, max: 2000 }))
    };

    cy.get('[data-cy=create-account-btn]').click();
    cy.get('select[name=country]').select('Bosnia and Herzegovina');

    // Create Account

    cy.get('[data-cy=next-step-btn]').click();
    // title
    cy.contains('Other').click();
    cy.get('input[name=first_name]').type(user.first_name);
    cy.get('input[name=last_name]').type(user.last_name);
    cy.get('input[name=username]').type(user.username);
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
    cy.get('input[name=password_confirm]').type(user.password);
    cy.get('input[name=phone_code]')
      .clear()
      .type(user.phone_code);
    cy.get('input[name=telephone]').type(user.phone_number);

    cy.get('[data-cy=form-next-step-btn]').click();
    cy.get('[data-cy=form-next-step-btn]').click();

    // Verify phone modal

    cy.get('[data-cy=verify-phone-btn]').click();
    cy.get('input[name=sms_code]')
      .type(user.verification_code)
      .should('have.value', user.verification_code);
    cy.get('[data-cy=confirm-verification-code-btn]').click();

    // Personal details

    cy.get('select[name=date-of-birth-day]').select(user.birth_day);
    cy.get('select[name=date-of-birth-month]').select(user.birth_month);
    cy.get('select[name=date-of-birth-year]').select(user.birth_year);
    cy.get('input[name=addr_zip]').type(user.postcode);
    cy.get('input[name=addr_street]').type(user.street);
    cy.get('input[name=addr_city]').type(user.city);

    cy.get('[data-cy=form-next-step-btn]').click();
  });
});
