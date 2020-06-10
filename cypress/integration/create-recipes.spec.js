describe('Creating a new recipe', () => {
  it('Clicks the link', () => {
    cy.visit('http://localhost:8080/admin/recipes/create')

    // Get an input, type into it and verify that the value has been updated
    cy.get('input[name="image"]')
      .type('https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80')
    cy.get('input[name="title"]')
      .type('Torrada Doce')
    cy.get('input[name="name"]')
      .type('Stefaninhu Docinho')
    cy.get('input[name="ingredients[]"]')
      .type('5 fatias de pão de forma')
    cy.contains('Adicionar novo ingrediente').click()
    cy.get('#ingredients > :nth-child(3) > input')
      .type('Açucar e canela para polvilhar')
    
    cy.get('input[name="preparation[]"]')
    .type('Frite as fatias de pão com manteiga numa frigideira')
    cy.contains('Adicionar novo passo').click()
    cy.get('#steps > :nth-child(3) > input')
      .type('Açucar e canela para polvilhar')

    cy.get('textarea[name="information"]')
    .type('Essa é uma receita muito especial para o café de manhã.')

    cy.contains('Salvar receita').click()

    cy.get('.wrapper h3').first().contains("Receita: Torrada Doce")

  })
}) 
