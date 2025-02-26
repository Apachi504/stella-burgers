import {combineSlices, configureStore} from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burger-ingredients/burger-ingredients-slice";
import burgerConstructorSlice from "./burger-constructor/burger-constructor-slice";
import orderSlice from "./order/order-slice.js";
import userSlice from "./user/user-slice.js";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";

const rootReducer = combineSlices({
    burgerIngredients: burgerIngredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    user: userSlice
})
export const store = configureStore({
    reducer: rootReducer
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
