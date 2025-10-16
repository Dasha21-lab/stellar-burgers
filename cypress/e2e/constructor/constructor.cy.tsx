/// <reference types='cypress' />

describe('Проверка - конструктор бургеров', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as(
            'getIngredients'
        );
        cy.visit('/');
        cy.wait('@getIngredients');
    });

    it('Добавление одного ингредиента в конструктор', () => {
        // Добавляем начинку (main-1)
        cy.contains('Начинки').scrollIntoView();
        cy.contains('Котлета').parent().parent().within(() => {
        cy.contains('Добавить').click();
        });
        
        // Проверяем, что в конструкторе отобразилась надпись 'Выберите булки' и 'Выберите начинку' пропала
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('not.exist');
    });

    it('Добавление булки и начинки', () => {
        // Добавляем булку
        cy.contains('Булки').scrollIntoView();
        cy.contains('Булка 1').parent().parent().within(() => {
        cy.contains('Добавить').click();
        });

        // Добавляем начинку
        cy.contains('Начинки').scrollIntoView();
        cy.contains('Котлета').parent().parent().within(() => {
            cy.contains('Добавить').click();
        });
    });
});