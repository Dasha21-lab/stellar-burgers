/// <reference types='cypress' />

describe('Проверка заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as(
            'getIngredients'
        );

        cy.intercept('GET', '/api/auth/user', {fixture: 'user.json'}).as(
            'getUser'
        );

        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
            'createOrder'
        );

        cy.setCookie('accessToken', 'test-access-token');
        window.localStorage.setItem('refreshToken', 'test-refresh-token');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    afterEach(() => {
        cy.clearCookie('accessToken');
        window.localStorage.removeItem('refreshToken');
    });

    it('Создание заказа и очистка конструктора', () => {
        // Собираем бургер
        cy.contains('Булки').scrollIntoView();
        cy.contains('Булка 1').parent().parent().within(() => {
            cy.contains('Добавить').click();
        });

        cy.contains('Начинки').scrollIntoView();
        cy.contains('Котлета').parent().parent().within(() => {
            cy.contains('Добавить').click();
        });

        // Оформляем заказ
        cy.contains('Оформить заказ').should('be.enabled').click();

        // Проверка открытие модального окна и номер заказа
        cy.wait('@createOrder');
        cy.contains('идентификатор заказа', { matchCase: false }).should('exist');
        cy.contains('424242').should('exist');

        // Проверка закрытия модального окна 
        cy.get('[data-cy=close]').click();
        cy.contains('424242').should('not.exist');

        // Проверка очистки конструктора
        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
    });
})