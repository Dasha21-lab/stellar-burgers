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
        cy.contains('Булка 1').click();
        cy.contains('Калории, ккал').should('exist');
        cy.contains('Булка 1').should('exist');
    });

    it('Закрытие по клику на крестик', () => {
        cy.contains('Булки').scrollIntoView();
        cy.contains('Булка 1').click();
        cy.contains('Калории, ккал').should('exist');
        cy.get('[data-cy=close]').click();
        cy.contains('Калории, ккал').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
        cy.contains('Булки').scrollIntoView();
        cy.contains('Булка 1').click();
        cy.contains('Калории, ккал').should('exist');
        cy.get('[data-cy=modal-overlay]').click('topRight', {force : true});
        cy.contains('Калории, ккал').should('not.exist');
    });
});