import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getOrderApi} from "../../utils/api";
import { resetConstructor } from "../burger-constructor/burger-constructor-slice";
import {TIngredients, TOrderState} from "./types";
import {TOrder} from "../../utils/types/prop-types";


export const getOrders = createAsyncThunk<TOrder,TIngredients>(
    'order/getOrders',
    async (  ingredients, {dispatch}) => {
        const order = [ingredients.bun._id, ...ingredients.ingredients.map((item) => item._id), ingredients.bun._id];
        const response = await getOrderApi(order);
        dispatch(resetConstructor());
        return response.order;
    }
);

 export const initialState:TOrderState = {
    orders: null,
    ordersLoading: false,
    ordersError: null,

};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    selectors: {
        getOrderNumber: (state) => state.orders?.number, // Селектор для получения номера заказа
        getOrderError: (state) => state.ordersError,
        getOrderLoading: (state) => state.ordersLoading
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.ordersLoading = true;
                state.ordersError = null; // Сбрасываем ошибку при начале загрузки
            })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<TOrder>) => {
                state.ordersError = null; // Сбрасываем ошибку при успешном выполнении
                state.ordersLoading = false;
                state.orders = action.payload; // Сохраняем данные заказа
            })
            .addCase(getOrders.rejected, (state,action) => {
                state.ordersLoading = false;
                state.ordersError = action.error.message || 'Произошла ошибка'; // Сохраняем сообщение об ошибке
            });
    }
});

// Экспорт редьюсера и селекторов
export default orderSlice.reducer;
export const { getOrderNumber, getOrderError, getOrderLoading } = orderSlice.selectors;