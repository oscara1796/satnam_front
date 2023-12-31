const logIn = () => {
  const { username, password } = Cypress.env('credentials')

  // Capture HTTP requests.
  // cy.intercept('POST', 'log_in', {
  //   statusCode: 200,
  //   body: {
  //     'access': 'ACCESS_TOKEN',
  //     'refresh': 'REFRESH_TOKEN'
  //   }
  // }).as('logIn');
  cy.intercept('POST', 'log_in').as('logIn')
  // Log into the app.
  cy.visit('/#/log-in')
  cy.get('input#username').type(username)
  cy.get('input#password').type(password, { log: false })
  cy.get('button').contains('Log in').click()
  cy.wait('@logIn')
}

describe('Authentication', function () {
  it('Can sign up.', function () {
    // cy.intercept('POST', 'sign_up', {
    //   statusCode: 201,
    //   body: {
    //     id: 1,
    //     username: 'gary.cole@example.com',
    //     first_name: 'Gary',
    //     last_name: 'Cole',
    //     group: 'driver',
    //     photo: '/media/images/photo.jpg'
    //   }
    // }).as('signUp');
    cy.intercept('POST', 'sign_up').as('signUp')

    cy.visit('/#/sign-up')
    cy.get('input#username').type('gary123')
    cy.get('input#email').type('user@example.com')
    cy.get('input#first_name').type('Gary')
    cy.get('input#last_name').type('Cole')
    cy.get('input#password1').type('pAssw0rd', { log: false })
    cy.get('input#password2').type('pAssw0rd', { log: false })
    cy.get('input#telephone').type('12345678')
    // cy.get('select#group').select('driver');

    // Handle file upload
    // cy.get('input#photo').attachFile('images/photo.jpg');

    cy.get('button').contains('Sign up').click()
    cy.wait('@signUp') // new
    cy.hash().should('eq', '#/log-in')
  })

  it('Can log in.', function () {
    logIn()
    cy.hash().should('eq', '#/')
    cy.get('button').contains('Log out')
  })

  it('Cannot visit the login page when logged in.', function () {
    logIn()
    cy.visit('/#/log-in')
    cy.hash().should('eq', '#/')
  })

  it('Cannot see links when logged in.', function () {
    logIn()
    cy.get('[data-cy="signUp"]').should('not.exist')
    cy.get('[data-cy="logIn"]').should('not.exist')
  })

  // not changed.

  it('Show invalid fields on sign up error.', function () {
    cy.intercept('POST', 'sign_up', {
      statusCode: 400,
      body: {
        username: ['A user with that username already exists.'],
      },
    }).as('signUp')
    cy.visit('/#/sign-up')
    cy.get('input#username').type('gary123')
    cy.get('input#email').type('user@example.com')
    cy.get('input#first_name').type('Gary')
    cy.get('input#last_name').type('Cole')
    cy.get('input#password1').type('pAssw0rd', { log: false })
    cy.get('input#password2').type('pAssw0rd', { log: false })
    cy.get('input#telephone').type('12345678')

    // Handle file upload
    // cy.get('input#photo').attachFile('images/photo.jpg');
    cy.get('button').contains('Sign up').click()
    cy.wait('@signUp')
    cy.get('div.invalid-feedback').contains(
      'A user with that username already exists'
    )
    cy.hash().should('eq', '#/sign-up')
  })

  it('Cannot visit the sign up page when logged in.', function () {
    logIn()
    cy.visit('/#/sign-up')
    cy.hash().should('eq', '#/')
  })

  it('Shows an alert on login error.', function () {
    const { username, password } = Cypress.env('credentials')
    cy.intercept('POST', 'log_in', {
      statusCode: 401,
      body: {
        errors:
          'Please enter a correct username and password. ' +
          'Note that both fields may be case-sensitive.',
      },
    }).as('logIn')
    cy.visit('/#/log-in')
    cy.get('input#username').type(username)
    cy.get('input#password').type(password, { log: false })
    cy.get('button').contains('Log in').click()
    cy.wait('@logIn')
    cy.get('div.alert').contains(
      'Please enter a correct username and password. ' +
        'Note that both fields may be case-sensitive.'
    )
    cy.hash().should('eq', '#/log-in')
  })

  it('Can log out.', function () {
    logIn()
    cy.get('[data-cy="logOut"]')
      .click()
      .should(() => {
        expect(window.localStorage.getItem('taxi.auth')).to.be.null
      })
    cy.get('[data-cy="logOut"]').should('not.exist')
  })
})
