import burgerIngredientsSlice, {getIngredients, initialState} from "./burger-ingredients-slice";
import {expect} from "@jest/globals";

describe('burgerIngredientsSlice', () => {
    it('должен вернуть the initial state', () => {
        const state = burgerIngredientsSlice(undefined, {type: 'unknown'});
        expect(state).toEqual(initialState);
    })

    it('должен обработать getIngredients.pending', () => {
        const action = {type: getIngredients.pending.type};
        const state = burgerIngredientsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            burgerIngredientsLoading: true,
            burgerIngredientsError: null
        });
    });

    it('должен обработать getIngredients.fulfilled', () => {
        const mockIngredient = [
            {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0
            }
        ]
        const action = {
            type: getIngredients.fulfilled.type,
            payload: mockIngredient
        };
        const state = burgerIngredientsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            burgerIngredients: mockIngredient,
            burgerIngredientsLoading: false,
            burgerIngredientsError: null
        });
    });

    it('должен обработать getIngredients.rejected', () => {
        const action = {
            type: getIngredients.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = burgerIngredientsSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            burgerIngredientsLoading: false,
            burgerIngredientsError: 'Ошибка'
        });
    })
})