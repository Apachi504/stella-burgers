/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        drag(target: string | Cypress.JQuery<HTMLElement>): Chainable<Subject>
    }
} 