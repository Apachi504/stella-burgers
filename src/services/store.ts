import {combineSlices, configureStore} from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burger-ingredients/burger-ingredients-slice";
import burgerConstructorSlice from "./burger-constructor/burger-constructor-slice";
import orderSlice from "./order/order-slice";
import userSlice from "./user/user-slice.js";
import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";
import {allOrdersSlice} from "./get-all-orders/get-all-orders-slice";
import {profileOrdersSlice} from "./get-profile-orders/profile-orders-slice";
import {socketMiddleware, TWsActionTypes} from "./middleware/socet-middleware";
import {allOrdersActions} from "./get-all-orders/actions";
import {profileOrdersActions} from "./get-profile-orders/actions";

const rootReducer = combineSlices({
    burgerIngredients: burgerIngredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    order: orderSlice,
    user: userSlice,
    allOrders: allOrdersSlice.reducer,
    profileOrders: profileOrdersSlice.reducer
})

const AllOrdersMiddleware = socketMiddleware(allOrdersActions,false);
const profileOrdersMiddleware = socketMiddleware(profileOrdersActions,true);
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AllOrdersMiddleware, profileOrdersMiddleware)
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
