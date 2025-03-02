import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getOrderApi} from "../../utils/api";
import { resetConstructor } from "../burger-constructor/burger-constructor-slice";
import {TIngredients, TOrderState} from "./types";
import {TOrder} from "../../utils/prop-types";


export const getOrders = createAsyncThunk<TOrder,TIngredients>(
    'order/getOrders',
    async (  ingredients, {dispatch}) => {
        const order = [ingredients.bun._id, ...ingredients.ingredients.map((item) => item._id), ingredients.bun._id];
        const response = await getOrderApi(order);
        dispatch(resetConstructor());
        return response.order;
    }
);
// export const getOrders = createAsyncThunk<TOrder, TIngredients>(
//     'order/getOrders',
//     async ({ ingredients, bun }, { dispatch, thunkAPI }) => {
//
//         if (!ingredients || !Array.isArray(ingredients)) {
//             return thunkAPI.rejectWithValue('Некорректные данные для ингредиентов');
//         }
//         if (!bun || !bun._id) {
//             return thunkAPI.rejectWithValue('Некорректные данные для булки');
//         }
//
//         try {
//             const order = [bun._id, ...ingredients.map((item) => item._id), bun._id];
//             const response =  await postDataIngredients(order);
//             if (!response.success) {
//                 throw new Error(response.message || 'Ошибка при создании заказа');
//             }
//             if (!response.order) {
//                 throw new Error('Ответ сервера не содержит данных о заказе');
//             }
//             dispatch(resetConstructor());
//             return response.order;
//         } catch (error) {
//             console.error('Error creating order:', error); // Логируем ошибку
//             return thunkAPI.rejectWithValue(error.message || 'Произошла ошибка');
//         }
//     }
// );
// Начальное состояние
const initialState:TOrderState = {
    orders: null, // Данные заказа
    ordersLoading: false, // Флаг загрузки
    ordersError: false, // Сообщение об ошибке
};

// Создание слайса
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
                state.ordersError = false; // Сбрасываем ошибку при начале загрузки
            })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<TOrder>) => {
                state.ordersError = false; // Сбрасываем ошибку при успешном выполнении
                state.ordersLoading = false;
                state.orders = action.payload; // Сохраняем данные заказа
            })
            .addCase(getOrders.rejected, (state) => {
                state.ordersLoading = false;
                state.ordersError = false; // Сохраняем сообщение об ошибке
            });
    }
});

// Экспорт редьюсера и селекторов
export default orderSlice.reducer;
export const { getOrderNumber, getOrderError, getOrderLoading } = orderSlice.selectors;