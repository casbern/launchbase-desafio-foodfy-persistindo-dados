describe('Create a new recipe and check if it was saved correctly in the db', () => {
  it('Goes to the link, input values, save and check on db', () => {
    cy.visit('http://localhost:8080/admin/recipes/create')

    // Get an input, type into it and verify that the value has been updated
    cy.get('input[name="image"]')
      .type('https://bit.ly/3dSRMo4')

    cy.get('input[name="title"]')
      .type('Titulo')

    cy.get('select[name="chef"]')
      .select('Mariana Roberto')

    cy.get('input[name="ingredients[]"]')
      .type('Ingrediente 1')

    cy.contains('Adicionar novo ingrediente')
      .click()

    cy.get('#ingredients > :nth-child(3) > input')
      .type('Ingrediente 2')

    cy.get('input[name="preparation[]"]')
      .type('Passo 1')

    cy.contains('Adicionar novo passo')
      .click()

    cy.get('#steps > :nth-child(3) > input')
      .type('Passo 2')

    cy.get('textarea[name="information"]')
      .type('Informação')

    cy.contains('Salvar receita')
      .click()

    //cy.get('.wrapper h3').first().contains("Receita: Torrada Doce")

    cy.location('pathname').then( (pathname) => {
      const id = pathname.split('/').pop()
      cy.task('query:db', `SELECT * FROM recipes WHERE id = ${id}`).then( (results) => {
        let receita = results[0]
        console.log(receita)
        expect(receita.image).to.equal('https://bit.ly/3dSRMo4')
        expect(receita.title).to.equal('Titulo')
        expect(receita.chef_id).to.equal(3)
        expect(receita.ingredients).to.eql(['Ingrediente 1', 'Ingrediente 2'])
        expect(receita.preparation).to.eql(['Passo 1', 'Passo 2'])
        expect(receita.information).to.equal('Informação')
        cy.task('query:db', `DELETE FROM recipes WHERE id = ${id}`).then( () => { console.log("Recipe was deleted")})
      })     
    })
  })
}) 


