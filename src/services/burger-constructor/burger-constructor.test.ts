import burgerConstructorSlice, {
    addBun,
    addIngredient,
    initialState, removeIngredient,
    resetConstructor, sortIngredients
} from "./burger-constructor-slice";
import { v6 } from 'uuid';
import {expect} from "@jest/globals";

const mockBun = {
    id: v6(),
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 20,
    fat: 43,
    carbohydrates: 23,
    calories: 43,
    price: 2343,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02.png',
    __v: 0,
}
const mockIngredient = {
    id:v6(),
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 20,
    fat: 43,
    carbohydrates: 23,
    calories: 43,
    price: 2343,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    __v: 0,
}
const mockIngredient1 = {
    id:v6(),
    _id: "643d69a5c3f7b9001cfa0945",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0
}
describe('burgerConstructorSlice', () => {
    it('должен вернуть the initial state', () => {
        const state = burgerConstructorSlice(undefined, {type: 'unknown'});
        expect(state).toEqual(initialState);
    })

    it('должен обработать addBun', () => {
        const action = {
            type: addBun.type,
            payload: mockBun
        };
        const state = burgerConstructorSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            bun: mockBun
        });
    });

    it('должен обработать addIngredient', () => {
        const action = {
            type: addIngredient.type,
            payload: mockIngredient
        };
        const state = burgerConstructorSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ingredients: [mockIngredient]
        });
    })

    it('должен обработать resetConstructor', () => {
        const stateWithData = {
            bun: mockBun,
            ingredients: [mockIngredient, mockIngredient]
        };
        const state = burgerConstructorSlice(stateWithData, resetConstructor());
        expect(state).toEqual(initialState);
    })
    describe('removeIngredient', () => {
        it('должен удалить ингредиент по id', () => {
            const addAction = addIngredient(mockIngredient);
            let state = burgerConstructorSlice(initialState, addAction);

            const removeAction = removeIngredient(state.ingredients[0].id);
            state = burgerConstructorSlice(state, removeAction);

            expect(state.ingredients).toHaveLength(0);
        });

        it('не должен изменять state если id не найден', () => {
            const stateWithIngredient = {
                ...initialState,
                ingredients: [mockIngredient]
            };

            const state = burgerConstructorSlice(
                stateWithIngredient,
                removeIngredient('non-existent-id')
            );

            expect(state.ingredients).toEqual([mockIngredient]);
        });
    });

    describe('sortIngredients', () => {
        it('должен корректно сортировать ингредиенты', () => {
            const stateWithIngredients = {
                ...initialState,
                ingredients: [mockIngredient, mockIngredient1]
            };

            const action = sortIngredients({
                dragIndex: 0,
                hoverIndex: 1
            });

            const state = burgerConstructorSlice(stateWithIngredients, action);

            expect(state.ingredients).toEqual([mockIngredient1, mockIngredient]);
        });

        it('не должен изменять state при одинаковых индексах', () => {
            const stateWithIngredients = {
                ...initialState,
                ingredients: [mockIngredient, mockIngredient]
            };

            const action = sortIngredients({
                dragIndex: 1,
                hoverIndex: 1
            });

            const state = burgerConstructorSlice(stateWithIngredients, action);

            expect(state.ingredients).toEqual([mockIngredient, mockIngredient]);
        });
    });
});