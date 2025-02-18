import {combineSlices, configureStore} from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burger-ingredients/burger-ingredients-slice.js";
import ingredientDetailsSlice from "./ingredient-details/ingredient-details-slice.js";
import burgerConstructorSlice from "./burger-constructor/burger-constructor-slice.js";
import orderSlice from "./order/order-slice.js";
import userSlice from "./user/user-slice.js";
const rootReducer = combineSlices({
    burgerIngredients: burgerIngredientsSlice,
    ingredientDetails: ingredientDetailsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    user: userSlice
})
export const store = configureStore({
    reducer: rootReducer
});
