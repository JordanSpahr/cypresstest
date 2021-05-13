/// <reference types="cypress" />


describe('My First Test', () => {
    it('visit espn', () => {
      cy.visit('https://www.espn.com/')
    })
    it('navigates to NBA page', () => {
      cy.get('a[id="global-nav-mobile-trigger"]').click()
      cy.get('span[class="link-text"]').contains('NBA').click()
    })
    it('navigates to standings page', () => {
      cy.get('.first-group > :nth-child(5) > a > .link-text').click().wait(10000)
    })
    it('verifies 76ers win percent ', () => {
      cy.wait(10000)
      cy.get('span[class="stat-cell"]').contains('47').then(($btn) =>{
        // const wins = $btn.text()
        Cypress.env('wins', $btn.text())
        cy.get('span[class="stat-cell"]').contains('22').then(($btn2) =>{
          // const losses = $btn2.text()
          Cypress.env('losses',$btn2.text())
          // expect(Cypress.env('wins')).to.eq(Cypress.env('losses'))
          cy.get('span[class="stat-cell"]').contains('.681').then(($btn3) =>{
            const wins = Cypress.env('wins')
            const losses = Cypress.env('losses')
            const percentage = $btn3.text()
            const totalGames =  Number(wins) + Number(losses)
            const winPercent = totalGames / Number(wins)
            expect(winPercent).to.eq(percentage)
            cy.log(totalGames,winPercent,wins)
          })
        })
      })
    })
  })