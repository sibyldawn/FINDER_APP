//Eric 2 end to end test
describe('JobsMatched test', function() {
   
    it('there should be a match finder button', function() {
        cy.visit('/JobsMatched')
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
        cy.get('.button').find('.Keep-Job-Matching!-button1')
        // cy.contains('type').click()
    })

    it('click to go to matches', function() {
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
        cy.get('.QuestionAnswer').click()
        
        cy.url().should('eq', 'http://localhost:3000/Messages')
    })
}) 