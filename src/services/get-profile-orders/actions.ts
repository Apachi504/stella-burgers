import {createAction} from "@reduxjs/toolkit";
import {IDataFeed} from "../../utils/types/web-socket-feed";

export const wsConnectProfileOrders = createAction<string, 'WS_CONNECT_PROFILE_ORDERS'>('WS_CONNECT_PROFILE_ORDERS');
export const wsDisconnectProfileOrders = createAction('WS_DISCONNECT_PROFILE_ORDERS');

export const wsConnecting = createAction('PROFILE_ORDERS_CONNECTING');
export const wsOpen = createAction('PROFILE_ORDERS_OPEN');
export const wsClose = createAction('PROFILE_ORDERS_CLOSE');
export const wsMessage = createAction<IDataFeed>('PROFILE_ORDERS_MESSAGE');
export const wsError = createAction<string>('PROFILE_ORDERS_ERROR');

export const profileOrdersActions = {
    connect: wsConnectProfileOrders,
    disconnect: wsDisconnectProfileOrders,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onMessage: wsMessage,
    onError: wsError
};