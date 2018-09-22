describe('KYC', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('kyc form non-eu', () => {
    cy.fixture('kyc_user_non_eu.json').as('kyc_user');
    cy.get('@kyc_user').then(user => {
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

      cy.get('select[name=date-of-birth-day]').select(user.birth_day);
      cy.get('select[name=date-of-birth-month]').select(user.birth_month);
      cy.get('select[name=date-of-birth-year]').select(user.birth_year);
      cy.get('input[name=addr_zip]').type(user.postcode);
      cy.get('input[name=addr_street]').type(user.street_name);
      cy.get('input[name=addr_city]').type(user.city_name);

      cy.get('[data-cy=form-next-step-btn]').click();
    });
  });

  it('kyc form eu', () => {
    cy.fixture('kyc_user_eu.json').as('kyc_user');
    cy.get('@kyc_user').then(user => {
      cy.get('[data-cy=create-account-btn]').click();
      cy.get('select[name=country]').select('Germany');

      // Create Account

      cy.get('[data-cy=next-step-btn]').click();
      // title
      cy.contains('Dr').click();
      cy.get('input[name=first_name]').type(user.first_name);
      cy.get('input[name=last_name]').type(user.last_name);
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('input[name=password_confirm]').type(user.password);
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

      cy.get('select[name=date-of-birth-day]').select(user.birth_day);
      cy.get('select[name=date-of-birth-month]').select(user.birth_month);
      cy.get('select[name=date-of-birth-year]').select(user.birth_year);
      cy.get('input[name=addr_zip]').type(user.postcode);
      cy.get('input[name=addr_street]').type(user.street_name);
      cy.get('input[name=addr_city]').type(user.city_name);

      cy.get('[data-cy=form-next-step-btn]').click();

      // Employer information

      cy.get('input[name=employer_name]').type(user.employer_name);
      cy.get('input[name=profession]').type(user.profession);
      // risk_knowledge
      cy.contains('Both of the above').click();

      cy.get('[data-cy=form-next-step-btn]').click();

      // Trading Knowledge

      cy.get('[type="checkbox"]').check();
      // financial instrument
      cy.contains('Stocks').click();
      // past_brokerage_service
      cy.contains('Yes').click();
      // investing_year
      cy.contains('Never').click();

      cy.get('[data-cy=form-next-step-btn]').click();
    });
  });
  it('kyc form spain', () => {
    cy.fixture('kyc_user_spain.json').as('kyc_user');
    cy.get('@kyc_user').then(user => {
      cy.get('[data-cy=create-account-btn]').click();
      cy.get('select[name=country]').select('Spain');

      // Create Account

      cy.get('[data-cy=next-step-btn]').click();
      // title
      cy.contains('Dr').click();
      cy.get('input[name=first_name]').type(user.first_name);
      cy.get('input[name=last_name]').type(user.last_name);
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(user.password);
      cy.get('input[name=password_confirm]').type(user.password);
      cy.get('input[name=phone_code]')
        .clear()
        .type(user.phone_code);
      cy.get('input[name=telephone]').type(
        Cypress.env('twilio_test_phone_number')
      );
      cy.get('input[name=nif_code]').type(user.nif_code);
      cy.get('input[name=mothers_maiden_name]').type(user.mothers_maiden_name);

      // Needs to click twice

      cy.get('[data-cy=form-next-step-btn]').click();
      //cy.get('[data-cy=form-next-step-btn]').click();

      // Verify phone modal

      cy.get('[data-cy=verify-phone-btn]').click();
      cy.get('input[name=sms_code]').type(
        Cypress.env('twilio_test_verification_code')
      );
      cy.get('[data-cy=confirm-verification-code-btn]').click();

      // Personal details

      cy.get('select[name=date-of-birth-day]').select(user.birth_day);
      cy.get('select[name=date-of-birth-month]').select(user.birth_month);
      cy.get('select[name=date-of-birth-year]').select(user.birth_year);
      cy.get('input[name=addr_zip]').type(user.postcode);
      cy.get('input[name=addr_street]').type(user.street_name);
      cy.get('input[name=addr_city]').type(user.city_name);

      cy.get('[data-cy=form-next-step-btn]').click();

      // Employer information

      cy.get('input[name=employer_name]').type(user.employer_name);
      cy.get('input[name=profession]').type(user.profession);
      // risk_knowledge
      cy.contains('Both of the above').click();

      cy.get('[data-cy=form-next-step-btn]').click();

      // Trading Knowledge

      cy.get('[type="checkbox"]').check();
      // financial instrument
      cy.contains('Stocks').click();
      // past_brokerage_service
      cy.contains('Yes').click();
      // investing_year
      cy.contains('Never').click();

      cy.get('[data-cy=form-next-step-btn]').click();
    });
  });
});
