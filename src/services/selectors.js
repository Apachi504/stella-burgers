import {createSelector} from "@reduxjs/toolkit";

export const totalPriceSelector = createSelector(
    state => state.burgerConstructor,
    state => state.bun ? state.bun.price * 2
        + state.ingredients.reduce((acc, el) => acc + el.price, 0) : 0);