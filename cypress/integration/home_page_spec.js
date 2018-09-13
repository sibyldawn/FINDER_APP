describe('The Home Page', function() {
    it('loads home page and routes to Auth0', function() {
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
        cy.get('svg[class="MuiSvgIcon-root-54 Header-AccountCircle-4"]').click()
        cy.url().should('contain', 'michaelkerr.auth0')
    })
    
    it('opens the menu', () => {
        cy.visit('/')
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('<')
            done()
            return false
        })
        cy.get('.Header-menuButton-3').click()
        expect(cy.get('div[class="Aside-root-128"]')).to.exist
    })
})