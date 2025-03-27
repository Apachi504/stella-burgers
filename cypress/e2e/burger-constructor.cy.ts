
/// <reference types="cypress" />

const BASE_URL = 'https://norma.nomoreparties.space/api';

describe('Конструктор бургеров', () => {
    const constructorDropZoneSelector = '[data-testid=constructor-dropzone]';
    const bunDropZoneSelector = '[data-testid=bun-dropzone]';
    const modalSelector = '#modals';

    beforeEach(() => {
        // Устанавливаем размер экрана
        cy.viewport(1920, 1080);
        // Переходим на главную страницу
        cy.visit('/');

        // Мокируем API запросы
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/auth/login', { fixture: 'user.json' }).as('login');

        // Авторизуем пользователя
        cy.setCookie('accessToken', 'test-token');
        localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    describe('Добавление ингредиентов через Drag and Drop', () => {
        it('должен добавлять булку в конструктор', () => {
            cy.wait('@getIngredients');

            // Находим булку и перетаскиваем в зону конструктора
            cy.get('[data-testid=ingredient-bun]').first().as('bun');
            cy.get('@bun').trigger('dragstart');
            cy.get('@bun').trigger('dragleave');

            cy.get(bunDropZoneSelector).as('dropzone');
            cy.get('@dropzone').trigger('dragenter');
            cy.get('@dropzone').trigger('dragover');
            cy.get('@dropzone').trigger('drop');
            cy.get('@bun').trigger('dragend');

            // Проверяем что булка добавилась
            cy.get('[data-testid=constructor-bun-top]').should('exist');
            cy.get('[data-testid=constructor-bun-bottom]').should('exist');
        });

        it('должен добавлять начинку в конструктор', () => {
            cy.wait('@getIngredients');

            // Находим ингредиент и перетаскиваем
            cy.get('[data-testid=ingredient-main]').first().as('ingredient');
            cy.get('@ingredient').trigger('dragstart');
            cy.get('@ingredient').trigger('dragleave');

            cy.get(constructorDropZoneSelector).as('dropzone');
            cy.get('@dropzone').trigger('dragenter');
            cy.get('@dropzone').trigger('dragover');
            cy.get('@dropzone').trigger('drop');
            cy.get('@ingredient').trigger('dragend');

            // Проверяем что ингредиент добавился
            cy.get('[data-testid=constructor-ingredient]').should('exist');
        });

        it('должен добавлять соус в конструктор', () => {
            cy.wait('@getIngredients');

            cy.get('[data-testid=ingredient-sauce]').first().as('sauce');
            cy.get('@sauce').trigger('dragstart');
            cy.get('@sauce').trigger('dragleave');

            cy.get(constructorDropZoneSelector).as('dropzone');
            cy.get('@dropzone').trigger('dragenter');
            cy.get('@dropzone').trigger('dragover');
            cy.get('@dropzone').trigger('drop');
            cy.get('@sauce').trigger('dragend');

            cy.get('[data-testid=constructor-ingredient]').should('exist');
        });
    });

    describe('Модальное окно ингредиента', () => {
        it('должен открывать и закрывать модальное окно с деталями', () => {
            cy.wait('@getIngredients');

            // Кликаем на ингредиент
            cy.get('[data-testid=ingredient-bun]').first().click();

            // Проверяем модальное окно
            cy.get(modalSelector).contains('Флюоресцентная булка R2-D3')
                .should('be.visible');

            // Закрываем модальное окно
            cy.get(modalSelector)
                .find('button')
                .click()
                .should('not.exist');

            // Проверяем, что модальное окно закрылось
            cy.get(modalSelector).should('not.be.visible');
        });
    });

    describe('Создание заказа', () => {
        beforeEach(() => {
            cy.clearCookies();
            cy.clearLocalStorage();
        });

        it('должен создавать заказ после добавления ингредиентов', () => {
            // 1. Авторизация
            cy.visit('/login');
            cy.get('input[type="email"]').type('test@example.com');
            cy.get('input[type="password"]').type('Azaza1');
            cy.get('button[type="submit"]').click();

            // Проверяем успешную авторизацию
            cy.wait('@login').its('response.statusCode').should('eq', 200);
            cy.getCookie('accessToken');
            cy.url().should('eq', Cypress.config().baseUrl + '/profile');

            // 2. Главная страница
            cy.visit('/');
            cy.wait('@getIngredients');

            // 3. Добавляем ингредиенты с проверкой
            // Булка
            cy.get('[data-testid=ingredient-bun]').first().as('bun');
            dragAndDrop('@bun', bunDropZoneSelector);
            cy.get('[data-testid=constructor-bun-top]').should('exist');
            cy.get('[data-testid=constructor-bun-bottom]').should('exist');

            // Начинка
            cy.get('[data-testid=ingredient-main]').first().as('ingredient');
            dragAndDrop('@ingredient', constructorDropZoneSelector);
            cy.get('[data-testid=constructor-ingredient]').should('exist');

            // 4. Перехват запроса перед кликом
            cy.intercept('POST', '**/orders*', (req) => {
                req.headers['authorization'] = 'Bearer test-token';
                req.reply({
                    success: true,
                    name: "Флюоресцентный бургер",
                    order: {
                        number: 99779
                    }
                });
            }).as('createOrder');

            // 5. Клик по кнопке с проверками
            cy.get('[data-testid=order-button]')
                .should('contain', 'Оформить заказ')
                .and('not.be.disabled')
                .click();

            // Ждём запрос и проверяем статус
                    cy.wait('@createOrder')
                        .its('response.statusCode')
                        .should('eq', 200);

            cy.get(modalSelector)
                .find('button')
                .click()
                .should('not.exist');
        });

        // Вспомогательная функция для DnD
        function dragAndDrop(sourceAlias: string, targetSelector: string) {
            cy.get(sourceAlias).trigger('dragstart');
            cy.get(targetSelector)
                .trigger('dragenter')
                .trigger('dragover')
                .trigger('drop');
            cy.get(sourceAlias).trigger('dragend');
        }
    });
});