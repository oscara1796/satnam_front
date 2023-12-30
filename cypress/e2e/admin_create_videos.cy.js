import { faker } from '@faker-js/faker'
import 'cypress-localstorage-commands'

const logIn = () => {
  const { username, password } = Cypress.env('admin_credentials')

  cy.intercept('POST', 'log_in').as('logIn')
  cy.visit('/#/log-in')
  cy.get('input#username').type(username)
  cy.get('input#password').type(password, { log: false })
  cy.get('button').contains('Log in').click()
  cy.wait('@logIn')
}

describe('Create videos as admin', () => {
  before(() => {
    // cy.task('execCommand', 'cd /home/oscar/Documents/projects/satnam/satnam && docker-compose down -v && docker-compose up -d && docker-compose exec core python manage.py create_superuser').then((result) => {
    //   cy.log(result.stdout)
    // });
    // cy.wait(10000);
  })

  beforeEach(() => {
    logIn()
    cy.wait(2000) // Adjust this wait as necessary
    cy.saveLocalStorage()
  })

  const numberOfVideos = 20

  for (let index = 0; index < numberOfVideos; index++) {
    it(`Create video ${index + 1}`, () => {
      cy.get('#adminmenue').contains('Admin').click()
      cy.get('a.custom-item-navbar-admin[href="#/videos-create"]').click()
      cy.get('label[for="title"].form-label').should('exist')
      cy.get('label[for="image"].form-label').should('exist')
      cy.get('label[for="description"].form-label').should('exist')
      cy.get('textarea[name="url"]')
        .should('exist')
        .and('have.attr', 'type', 'url')
        .and('have.class', 'form-control')
        .and('have.attr', 'rows', '4')

      const randomTitle = 'Random Title ' + Math.floor(Math.random() * 1000)
      cy.get('input[name="title"]').type(randomTitle)

      cy.fixture('photo.jpg').as('photo')
      cy.get('input[name="image"]').attachFile('photo.jpg')

      const textToType = faker.lorem.paragraphs(5)
      cy.get('.public-DraftEditor-content').type(textToType)

      const vimeoEmbedCode = `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/812546083?h=6bb8408b54&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="clase para la energía, creatividad y prosperidad.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
      cy.get('textarea[name="url"]').type(vimeoEmbedCode)

      cy.get('input[name="free"]').check()
      cy.contains('Añade categoria').click()
      cy.get('#title_category').type(faker.lorem.words())
      cy.get('#category_description').type(faker.lorem.words(20))
      cy.get('#category_submit_button').click()

      cy.get('input[name="free"]').should('be.checked')
      cy.get('textarea[name="url"]').should('have.value', vimeoEmbedCode)
      cy.get('input[name="title"]').should('have.value', randomTitle)

      cy.get('#create_video_button').click()
    })
  }

  it('should verify that n video card containers are created', () => {
    cy.get('#video_cursos').click()

    const expectedNumberOfVideos = numberOfVideos // Replace n with the expected number of video containers

    cy.get('.video-card-search.container').should(
      'have.length',
      expectedNumberOfVideos
    )
  })
})
