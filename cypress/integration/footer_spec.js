//SIBYL
describe('Footer Routes Test', function() {
   
    it('Click Message Icon should link to Messages', function() {
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('<')
        
            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done()
        
            // return false to prevent the error from
            // failing this test
            return false
        })
        cy.get('.MessageIcon').click()
        
        cy.url().should('eq', 'http://localhost:3000/Messages')
    })

    it('Click MatchFinder Icon should link to MatchFinder', function() {
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('<')
        
            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done()
        
            // return false to prevent the error from
            // failing this test
            return false
        })
        cy.get('.MatchIcon').click()
        
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Click JobMap Icon should link to JobMap', function() {
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('<')
        
            // using mocha's async done callback to finish
            // this test so we prove that an uncaught exception
            // was thrown
            done()
        
            // return false to prevent the error from
            // failing this test
            return false
        })
        cy.get('.MapIcon').click()
        
        cy.url().should('eq', 'http://localhost:3000/JobMap')
    })
})