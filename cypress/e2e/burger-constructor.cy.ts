/// <reference types="cypress" />

const BASE_URL = 'https://norma.nomoreparties.space/api';

describe('Конструктор бургеров', () => {
    const ingredientCardSelector = '[data-testid=ingredient-card]';
    const constructorDropZoneSelector = '[data-testid=constructor-dropzone]';
    const bunDropZoneSelector = '[data-testid=bun-dropzone]';
    const modalSelector = '#modals';
    const orderButtonSelector = '[data-testid=order-button]';

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

    // describe('Добавление ингредиентов через Drag and Drop', () => {
    //     it('должен добавлять булку в конструктор', () => {
    //         cy.wait('@getIngredients');

    //         // Находим булку и перетаскиваем в зону конструктора
    //         cy.get('[data-testid=ingredient-bun]').first().as('bun');
    //         cy.get('@bun').trigger('dragstart');
    //         cy.get('@bun').trigger('dragleave');

    //         cy.get(bunDropZoneSelector).as('dropzone');
    //         cy.get('@dropzone').trigger('dragenter');
    //         cy.get('@dropzone').trigger('dragover');
    //         cy.get('@dropzone').trigger('drop');
    //         cy.get('@bun').trigger('dragend');

    //         // Проверяем что булка добавилась
    //         cy.get('[data-testid=constructor-bun-top]').should('exist');
    //         cy.get('[data-testid=constructor-bun-bottom]').should('exist');
    //     });

    //     it('должен добавлять начинку в конструктор', () => {
    //         cy.wait('@getIngredients');

    //         // Находим ингредиент и перетаскиваем
    //         cy.get('[data-testid=ingredient-main]').first().as('ingredient');
    //         cy.get('@ingredient').trigger('dragstart');
    //         cy.get('@ingredient').trigger('dragleave');

    //         cy.get(constructorDropZoneSelector).as('dropzone');
    //         cy.get('@dropzone').trigger('dragenter');
    //         cy.get('@dropzone').trigger('dragover');
    //         cy.get('@dropzone').trigger('drop');
    //         cy.get('@ingredient').trigger('dragend');

    //         // Проверяем что ингредиент добавился
    //         cy.get('[data-testid=constructor-ingredient]').should('exist');
    //     });

    //     it('должен добавлять соус в конструктор', () => {
    //         cy.wait('@getIngredients');

    //         cy.get('[data-testid=ingredient-sauce]').first().as('sauce');
    //         cy.get('@sauce').trigger('dragstart');
    //         cy.get('@sauce').trigger('dragleave');

    //         cy.get(constructorDropZoneSelector).as('dropzone');
    //         cy.get('@dropzone').trigger('dragenter');
    //         cy.get('@dropzone').trigger('dragover');
    //         cy.get('@dropzone').trigger('drop');
    //         cy.get('@sauce').trigger('dragend');

    //         cy.get('[data-testid=constructor-ingredient]').should('exist');
    //     });
    // });

    // describe('Модальное окно ингредиента', () => {
    //     it('должен открывать и закрывать модальное окно с деталями', () => {
    //         cy.wait('@getIngredients');

    //         // Кликаем на ингредиент
    //         cy.get('[data-testid=ingredient-bun]').first().click();

    //         // Проверяем модальное окно
    //         cy.get(modalSelector).contains('Флюоресцентная булка R2-D3')
    //         .should('be.visible');

    //         // Закрываем модальное окно
    //         cy.get('[data-testid=modal-close]').click();
            
    //         // Проверяем, что модальное окно закрылось
    //         cy.get(modalSelector).should('not.be.visible');
    //     });
    // });    
    //     describe('Создание заказа', () => {
          
    //     it('должен создавать заказ после добавления ингредиентов', () => {
    //         // Сначала авторизуем пользователя
    //         cy.clearCookies();
    //         cy.clearLocalStorage();
    //         cy.visit('/login');
    //         cy.get('input[type="email"]').type('test@example.com');
    //         cy.get('input[type="password"]').type('Azaza1');
    //         cy.get('button[type="submit"]').click();
    //         cy.wait('@login').its('response.statusCode').should('eq', 200);
            
    //         cy.url().should('eq', Cypress.config().baseUrl + '/profile');
            
    //         // Переходим на главную страницу
    //         cy.visit('/');
            
    //         // Ждем загрузки ингредиентов
    //         cy.wait('@getIngredients');
    //         // Добавляем булку
    //         cy.get('[data-testid=ingredient-bun]').first().as('bun');
    //         cy.get('@bun').trigger('dragstart');
    //         cy.get('@bun').trigger('dragleave');

    //         cy.get(bunDropZoneSelector).as('dropzone');
    //         cy.get('@dropzone').trigger('dragenter');
    //         cy.get('@dropzone').trigger('dragover');
    //         cy.get('@dropzone').trigger('drop');
    //         cy.get('@bun').trigger('dragend');

    //         // Добавляем начинку
    //         cy.get('[data-testid=ingredient-main]').first().as('ingredient');
    //         cy.get('@ingredient').trigger('dragstart');
    //         cy.get('@ingredient').trigger('dragleave');

    //         cy.get(constructorDropZoneSelector).as('dropzone');
    //         cy.get('@dropzone').trigger('dragenter');
    //         cy.get('@dropzone').trigger('dragover');
    //         cy.get('@dropzone').trigger('drop');
    //         cy.get('@ingredient').trigger('dragend');
    //         // Проверяем, что кнопка активна и содержит правильный текст
    //         cy.get('[data-testid=order-button]')
    //             .should('contain', 'Оформить заказ')
    //             .and('not.be.disabled')
    //             .click();
                
    //         // Проверяем, что НЕТ перенаправления на /login
    //         cy.url().should('not.include', '/login');

    //         // Ждём запрос и проверяем статус
    //         cy.wait('@createOrder')
    //         .its('response.statusCode')
    //         .should('eq', 200);

    //         // Проверяем модальное окно
    //         cy.get(modalSelector).should('be.visible');
    //         cy.get('[data-testid=order-number]').should('contain', '99999');

    //         // Закрываем модальное окно и проверяем его отсутствие
    //         cy.get('[data-testid=modal-close]').click();
    //         cy.get(modalSelector).should('not.be.visible');
    //         cy.get(modalSelector).should('not.exist');
    //     });
    // });
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
                        number: 99999
                    }
                });
            }).as('createOrder');
    
            // 5. Клик по кнопке с проверками
            cy.get('[data-testid=order-button]')
                .should('contain', 'Оформить заказ')
                .and('not.be.disabled')
                .click();
    
            // 6. Проверяем отсутствие редиректа
            cy.url().should('not.include', '/login');

            // 7. Ожидаем запрос с увеличенным таймаутом
            cy.wait('@createOrder', { timeout: 15000 })
                .then((interception) => {
                    // Проверяем статус и тело ответа
                    expect(interception.response?.statusCode).to.eq(200);
                    expect(interception.response?.body).to.have.property('success', true);
                    expect(interception.response?.body.order).to.have.property('number');
                    
                    // Для отладки выводим номер заказа
                    const orderNumber = interception.response?.body.order.number;
                    cy.log(`Получен номер заказа: ${orderNumber}`);
                });

            // 8. Проверяем модальное окно с ожиданием анимации
            cy.get(modalSelector, { timeout: 10000 })
                .find('[data-testid=order-number]')
                .should('exist')
                .and('be.visible')
                .and('contain', '99999');
            
            // Добавляем задержку перед кликом
            cy.wait(1000);
            
            // Кликаем по кнопке закрытия
            // cy.get('[data-testid=modal-close]')
            //     .should('exist')
            //     .and('be.visible')
            //     .click({ force: true });

            // 9. Проверяем закрытие модального окна
            cy.get(modalSelector)
                .find('button')
                .click()
                .should('not.exist');
        });
    
        // Вспомогательная функция для DnD
        function dragAndDrop(sourceAlias, targetSelector) {
            cy.get(sourceAlias).trigger('dragstart');
            cy.get(targetSelector)
                .trigger('dragenter')
                .trigger('dragover')
                .trigger('drop');
            cy.get(sourceAlias).trigger('dragend');
        }
    });
});