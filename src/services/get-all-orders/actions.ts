import {createAction} from "@reduxjs/toolkit";
import {IDataFeed} from "../../utils/types/web-socket-feed";

export const wsConnectAllOrders = createAction<string, 'WS_CONNECT_ALL_ORDERS'>('WS_CONNECT_ALL_ORDERS');
export const wsDisconnectAllOrders = createAction('WS_DISCONNECT_ALL_ORDERS');

export const wsConnecting = createAction('ALL_ORDERS_CONNECTING');
export const wsOpen = createAction('ALL_ORDERS_OPEN');
export const wsClose = createAction('ALL_ORDERS_CLOSE');
export const wsMessage = createAction<IDataFeed>('ALL_ORDERS_MESSAGE');
export const wsError = createAction<string>('ALL_ORDERS_ERROR');

export const allOrdersActions = {
    connect: wsConnectAllOrders,
    disconnect: wsDisconnectAllOrders,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onMessage: wsMessage,
    onError: wsError
};