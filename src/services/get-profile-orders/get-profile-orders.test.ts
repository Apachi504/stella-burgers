
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";
import {WebsocketStatus} from "../../utils/types/web-socket-feed";
import profileOrdersReducer, {initialState} from "./profile-orders-slice";

describe('profileOrdersReducer', () => {
    describe('initial state', () => {
        it('должен вернуть initial state', () => {
            const state = profileOrdersReducer(undefined, { type: 'unknown' });
            expect(state).toEqual(initialState);
        });
    });
    it('Должно начать устанавливаться websocket соединение', () => {
        const store = initialState;
        const action = { type: wsConnecting.type };
        const state = profileOrdersReducer(store, action);
        expect(profileOrdersReducer(store, action)).toEqual({ ...initialState, status: WebsocketStatus.CONNECTING });
    });
    it('Должно установиться websocket соединение', () => {
        const store = { ...initialState, status: WebsocketStatus.CONNECTING };
        const action = { type: wsOpen.type };
        expect(profileOrdersReducer(store, action)).toEqual({ ...initialState, status: WebsocketStatus.ONLINE });
    });
    it('Должно закрыться websocket соединение', () => {
        const store = { ...initialState, status: WebsocketStatus.ONLINE };
        const action = { type: wsClose.type };
        expect(profileOrdersReducer(store, action)).toEqual(initialState);
    });
    it('Должна записаться ошибка websocket соединения', () => {
        const store = { ...initialState, status: WebsocketStatus.ONLINE };
        const action = { type: wsError.type, payload: 'Ошибка' };
        expect(profileOrdersReducer(store, action)).toEqual({
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
        expect(profileOrdersReducer(store, action)).toEqual({
            ...initialState,
            orders: [{ _id: '643d69a5c3f7b9001cfa093c', name: 'Краторная булка N-200i', price: 1255 }],
            status: WebsocketStatus.ONLINE,
        });
    });
});