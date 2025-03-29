
import {expect} from "@jest/globals";
import orderSlice, {getOrders, initialState} from "./order-slice";

describe('orderSlice', () => {
    it('должен вернуть the initial state', () => {
        const state = orderSlice(undefined, {type: 'unknown'});
        expect(state).toEqual(initialState);
    });

    it('должен обработать getOrders.pending', () => {
        const action = {type: getOrders.pending.type};
        const state = orderSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ordersLoading: true,
            ordersError: null
        });
    });
    it('должен обработать getOrders.fulfilled', () => {
        const mockOrder = {
            _id: '1',
            number: 123,
            ingredients: ['ing1', 'ing2', 'ing1'],
            name: 'Test Order',
            status: 'done'
        }
        const action = {type: getOrders.fulfilled.type, payload: mockOrder};
        const state = orderSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            orders: mockOrder,
            ordersLoading: false,
            ordersError: null
        });
    });
    it('должен обработать getOrders.rejected', () => {
        const action = {
            type: getOrders.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = orderSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            ordersLoading: false,
            ordersError: 'Ошибка'
        });
    });
});