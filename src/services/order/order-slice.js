import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getOrder} from "../../utils/api.js";

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async ({ingredients, bun}, thunkAPI) => {
        const order = [bun._id, ...ingredients.map((item) => item._id), bun._id];
        const response = await getOrder(order);
        return response.order.number;
    }
)

const initialState = {
        orders: null,
        ordersLoading: false,
        ordersError: false
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    selectors:{
        getOrderNumber: (state) => state.orders
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.ordersLoading = true;
                state.ordersError = false;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.ordersError = false;
                state.ordersLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.ordersLoading = false;
                state.ordersError = true;
            })
    }
});
export default orderSlice.reducer;
export const {getOrderNumber} = orderSlice.selectors;