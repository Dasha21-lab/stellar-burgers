///<reference types='cypress'/>

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
        cy.get('[data-cy=ingredients-bun]').within(() => {
            cy.contains('Булка 1').parent().parent().within(() => {
                cy.contains('Добавить').click();
            });
        });

        cy.contains('Начинки').scrollIntoView();
        cy.get('[data-cy=ingredients-main]').within(() => {
            cy.contains('Котлета').parent().parent().within(() => {
                cy.contains('Добавить').click();
            });
        });

        // Оформляем заказ
        cy.get('[data-cy=burger-constructor]').within(() => {
            cy.contains('Оформить заказ').should('be.enabled').click();
        });

        // Проверка открытия модального окна и номер заказа
        cy.wait('@createOrder');
        cy.get('[data-cy=modal]').within(() => {
            cy.contains('идентификатор заказа', { matchCase: false }).should('exist');
            cy.get('[data-cy=order_number]').should('contain', '424242');
            cy.contains('Ваш заказ начали готовить').should('exist');
            cy.contains('Дождитесь готовности на орбитальной станции').should('exist');
        });

        // Проверка закрытия модального окна 
        cy.get('[data-cy=modal]').within(() => {
            cy.get('[data-cy=close]').click();
        });
        cy.get('[data-cy=modal]').should('not.exist');

        // Проверка очистки конструктора
        cy.get('[data-cy=burger-constructor]').within(() => {
            cy.get('[data-cy=constructor-no-buns-top]').should('exist');
            cy.get('[data-cy=constructor-no-buns-bottom]').should('exist');
            cy.get('[data-cy=constructor-no-ingredients]').should('exist');
        });
    });
});