/// <reference types="cypress" />

describe('Home', () => {
  it('Visita la home y hace una búsqueda', () => {
    cy.visit('/');
    cy.get('#busqueda').type('cli');
    cy.get('[data-test-id="585245"]').click({ force: true });
    cy.location('pathname').should('match', /\/585245$/);
  });
});
