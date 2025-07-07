describe('basic flow', () => {
  it('upload to editor', () => {
    cy.visit('/');
    cy.url().should('include', '/upload');
    cy.get('input[type=file]').selectFile('cypress/fixtures/sample.wav', { force: true });
    cy.contains('button', 'Start').click();
    cy.contains('Transcribing');
    cy.contains('Transcribing', { timeout: 5000 });
    cy.url({ timeout: 5000 }).should('include', '/editor');
    cy.get('textarea').should('contain.value', 'Lorem ipsum');
    cy.contains('Back to Upload').click();
    cy.url().should('include', '/upload');
  });
});
