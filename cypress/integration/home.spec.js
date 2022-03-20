/// <reference types="cypress" />

context("Home Page", ()=>{
  beforeEach(()=> {
    cy.visit("http://localhost:3000")
  })

  it("should find our home page with 3 chars on it", ()=>{
    cy.get('[data-testid="row-0"]')
      .children().should('have.length', 3)
  })

  it("the nav word length incrementor should work", ()=>{
    cy.get('[data-testid="navWordLength"]')
      .should('have.text', "3")
      .click()
      .should('have.text', "4")
    
    cy.get('[data-testid="row-0"]')
      .children().should('have.length', 4)
  })

  it("the word should be on the page", ()=>{
    cy.get('[data-testid="word-h1"]')
      .should($H1 => {
        expect($H1.text().length).to.equal(3)
      })
  })

})