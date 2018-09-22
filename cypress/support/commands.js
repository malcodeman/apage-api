Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('api_url') + 'user/login',
    headers: {
      'accept-version': '1.1.0',
      'Content-Type': 'application/json',
      platform: 'native-android'
    },
    body: {
      user_name: username,
      password: password
    }
  }).then(res => {
    const tokens = {
      token: res.body.info.token,
      xsrf: res.body.info.xsrf,
      refreshToken: res.body.info.refreshToken,
      tokenExpirationDate: res.body.info.token_expiration,
      user_id: res.body.data.user_id,
      user_name: res.body.data.user_name,
      is_eu: res.body.data.is_eu
    };
    cy.setCookie('tokens', JSON.stringify(tokens));
  });
});
Cypress.Commands.add('sms_send', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('api_url') + 'sms/send',
    headers: {
      'accept-version': '1.*',
      'Content-Type': 'application/json',
      platform: 'web-naga-markets'
    },
    body: {
      phone_number: Cypress.env('twilio_test_phone_number')
    }
  }).then(res => {
    console.log('sms_send works');
  });
});
Cypress.Commands.add('sms_verify', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('api_url') + 'sms/verify',
    headers: {
      'accept-version': '1.*',
      'Content-Type': 'application/json',
      platform: 'web-naga-markets'
    },
    body: {
      phone_number: Cypress.env('twilio_test_phone_number'),
      verification_code: Cypress.env('twilio_test_verification_code')
    }
  }).then(res => {
    console.log('sms_verify works');
  });
});
