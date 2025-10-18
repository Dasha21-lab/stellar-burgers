///<reference types='cypress'/>

describe('Проверка модальных окон', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as(
            'getIngredients'
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

    it('Oткрытие при клике по ингредиенту', () => {
        cy.contains('Булки').scrollIntoView();
        cy.get('[data-cy=ingredients-bun]').contains('Булка 1').click({force: true});
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').contains('Булка 1').should('exist');
        
        // Дополнительная проверка на наличие деталей ингредиента
        cy.contains('Калории, ккал').should('exist');
    });

    it('Закрытие по клику на крестик', () => {
        cy.contains('Булки').scrollIntoView();
        cy.get('[data-cy=ingredients-bun]').contains('Булка 1').click({force: true});
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').contains('Булка 1').should('exist');
        
        // Закрываем модальное окно
        cy.get('[data-cy=close]').click();
        
        // Проверяем, что модальное окно закрылось
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
        cy.contains('Булки').scrollIntoView();
        cy.get('[data-cy=ingredients-bun]').contains('Булка 1').click({force: true});
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').contains('Булка 1').should('exist');
        
        // Закрываем модальное окно через оверлей
        cy.get('[data-cy=modal-overlay]').click({force: true});
        
        // Проверяем, что модальное окно закрылось
        cy.get('[data-cy=modal]').should('not.exist');
    });
});