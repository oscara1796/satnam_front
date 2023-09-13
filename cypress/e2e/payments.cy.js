


const signUp = () => {
    cy.intercept('POST', 'sign_up').as('signUp');


    cy.visit('/#/sign-up');
    cy.get('input#username').type('gary123');
    cy.get('input#email').type('oscara1706cl@gmail.com');
    cy.get('input#first_name').type('Gary');
    cy.get('input#last_name').type('Cole');
    cy.get('input#password1').type('pAssw0rd', { log: false });
    cy.get('input#password2').type('pAssw0rd', { log: false });
    cy.get('input#telephone').type('12345678');
    // cy.get('select#group').select('driver');
  
    // Handle file upload
    // cy.get('input#photo').attachFile('images/photo.jpg');
  
    cy.get('button').contains('Sign up').click();
    cy.wait('@signUp'); // new
    cy.hash().should('eq', '#/log-in');
}

const logIn = () => {
    const { username, password } = Cypress.env('credentials');
  
    // Capture HTTP requests.
    // cy.intercept('POST', 'log_in', {
    //   statusCode: 200,
    //   body: {
    //     'access': 'ACCESS_TOKEN',
    //     'refresh': 'REFRESH_TOKEN'
    //   }
    // }).as('logIn');
    cy.intercept('POST', 'log_in').as('logIn');
    // Log into the app.
    cy.visit('/#/log-in');
    cy.get('input#username').type("oscara1706cl@gmail.com");
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Log in').click();
    cy.wait('@logIn');
  };

const logOut = () => {
  cy.get('[data-cy="logOut"]').click().should(() => {
    expect(window.localStorage.getItem('taxi.auth')).to.be.null;
  });
  cy.get('[data-cy="logOut"]').should('not.exist');
}

describe('Payment', function () {

    //   it('failed payment', function () {
    //     signUp();
    //     logIn();
    //     cy.intercept('POST', 'http://localhost:8009/api/create_subscription/1/').as('createSubscription');
    //     cy.get('a[role="button"][tabindex="0"][href="#/sub-form"].btn.btn-outline-light')
    //     .eq(0)  // Index 0 refers to the first matching element
    //     .click();


    //     cy.visit('/#/sub-form');
        
    //     cy.get('input[name="card_number"]').type("4000000000000341");
    //     cy.get('input[name="exp_month"]').type("12");
    //     cy.get('input[name="exp_year"]').type("2025");
    //     cy.get('input[name="cvc"]').type("123");
    //     cy.get('button').contains('Subscribe').click();
    //     cy.wait('@createSubscription', 5000);
    //     cy.visit('/#/');
    //     cy.hash().should('eq', '#/');
    // });
    it('Can pay', function () {
        
        signUp();
        logIn();
        cy.intercept('POST', 'http://localhost:8009/api/create_subscription/1/').as('createSubscription');
        cy.get('a[role="button"][tabindex="0"][href="#/sub-form"].btn.btn-outline-light')
        .eq(0)  // Index 0 refers to the first matching element
        .click();


        cy.visit('/#/sub-form');
        
        cy.get('input[name="card_number"]').type("4242424242424242");
        cy.get('input[name="exp_month"]').type("12");
        cy.get('input[name="exp_year"]').type("2025");
        cy.get('input[name="cvc"]').type("123");
        cy.get('button').contains('Subscribe').click();
        cy.wait('@createSubscription', 5000);
        cy.hash().should('eq', '#/');
    });


    
  
  
    
  
    
  })