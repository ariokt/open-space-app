/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Username"]').type('aaa');
    cy.get('input[placeholder="Password"]').type('bbb');
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('test123456');
    cy.get('button').contains(/^Login$/).click();

    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('textarea[placeholder="What are you thinking?"]').should('be.visible');
  })
})