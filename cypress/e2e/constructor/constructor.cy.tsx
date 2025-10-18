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
        cy.get('[data-cy=ingredients-main]').within(() => {
            cy.contains('Котлета').parent().parent().within(() => {
                cy.contains('Добавить').click();
            });
        });
        
        // Проверяем, что в конструкторе отобразилась надпись 'Выберите булки' и 'Выберите начинку' пропала
        cy.get('[data-cy=constructor-no-buns-top]').should('exist');
        cy.get('[data-cy=constructor-no-buns-bottom]').should('exist');
        cy.get('[data-cy=constructor-no-ingredients]').should('not.exist');
        
        // Проверяем, что ингредиент появился в конструкторе
        cy.get('[data-cy=constructor-ingredients-list]').should('contain', 'Котлета');
        cy.get('[data-cy=constructor-ingredients-list]').should('not.contain', 'Выберите начинку');
    });

    it('Добавление булки и начинки', () => {
        // Добавляем булку
        cy.contains('Булки').scrollIntoView();
        cy.get('[data-cy=ingredients-bun]').within(() => {
            cy.contains('Булка 1').parent().parent().within(() => {
                cy.contains('Добавить').click();
            });
        });

        // Проверяем, что булка появилась в конструкторе (верх и низ)
        cy.get('[data-cy=constructor-bun-top]').should('exist');
        cy.get('[data-cy=constructor-bun-bottom]').should('exist');
        cy.get('[data-cy=constructor-bun-top]').should('contain', 'Булка 1 (верх)');
        cy.get('[data-cy=constructor-bun-bottom]').should('contain', 'Булка 1 (низ)');
        
        // Проверяем, что сообщения "Выберите булки" исчезли
        cy.get('[data-cy=constructor-no-buns-top]').should('not.exist');
        cy.get('[data-cy=constructor-no-buns-bottom]').should('not.exist');

        // Добавляем начинку
        cy.contains('Начинки').scrollIntoView();
        cy.get('[data-cy=ingredients-main]').within(() => {
            cy.contains('Котлета').parent().parent().within(() => {
                cy.contains('Добавить').click();
            });
        });

        // Проверяем, что начинка появилась в конструкторе
        cy.get('[data-cy=constructor-ingredients-list]').should('contain', 'Котлета');
        cy.get('[data-cy=constructor-ingredients-list]').should('not.contain', 'Выберите начинку');
        
        // Проверяем, что сообщение "Выберите начинку" исчезло
        cy.get('[data-cy=constructor-no-ingredients]').should('not.exist');
    });
});