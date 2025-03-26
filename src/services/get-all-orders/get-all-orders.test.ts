import { expect } from '@jest/globals';
import allOrdersReducer, {initialState} from './get-all-orders-slice';
import {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} from './actions';
import { WebsocketStatus } from '../../utils/types/web-socket-feed';


describe('allOrdersReducer', () => {
    describe('initial state', () => {
        it('должен вернуть initial state', () => {
            const state = allOrdersReducer(undefined, { type: 'unknown' });
            expect(state).toEqual(initialState);
        });
    });
    it('Должно начать устанавливаться websocket соединение', () => {
        const store = initialState;
        const action = { type: wsConnecting.type };
        expect(allOrdersReducer(store, action)).toEqual({ ...initialState, status: WebsocketStatus.CONNECTING });
    });
    it('Должно установиться websocket соединение', () => {
        const store = { ...initialState, status: WebsocketStatus.CONNECTING };
        const action = { type: wsOpen.type };
        expect(allOrdersReducer(store, action)).toEqual({ ...initialState, status: WebsocketStatus.ONLINE });
    });
    it('Должно закрыться websocket соединение', () => {
        const store = { ...initialState, status: WebsocketStatus.ONLINE };
        const action = { type: wsClose.type };
        expect(allOrdersReducer(store, action)).toEqual(initialState);
    });
    it('Должна записаться ошибка websocket соединения', () => {
        const store = { ...initialState, status: WebsocketStatus.ONLINE };
        const action = { type: wsError.type, payload: 'Ошибка' };
        expect(allOrdersReducer(store, action)).toEqual({
            ...initialState,
            error: 'Ошибка',
            status: WebsocketStatus.ONLINE,
        });
    });
    it('Должно прийти сообщение с websocket соединения', () => {
        const store = { ...initialState, status: WebsocketStatus.ONLINE };
        const action = {
            type: wsMessage.type,
            payload: [{ _id: '643d69a5c3f7b9001cfa093c', name: 'Краторная булка N-200i', price: 1255 }],
        };
        expect(allOrdersReducer(store, action)).toEqual({
            ...initialState,
            order: [{ _id: '643d69a5c3f7b9001cfa093c', name: 'Краторная булка N-200i', price: 1255 }],
            status: WebsocketStatus.ONLINE,
        });
    });
});