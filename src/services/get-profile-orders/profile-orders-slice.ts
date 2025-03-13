import {IDataFeed, WebsocketStatus} from "../../utils/types/web-socket-feed";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {allOrdersSlice} from "../get-all-orders/get-all-orders-slice";

export type TProfileOrdersState = {
    status: WebsocketStatus;
    error: null | string;
    orders: IDataFeed | null;
}
export const initialState:TProfileOrdersState = {
    status: WebsocketStatus.OFFLINE,
    error: null,
    orders: null
}
export const profileOrdersSlice = createSlice({
    name: 'profileOrders',
    initialState,
    reducers: {
        wsConnecting:(state) =>{
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen:(state)=> {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        },
        wsClose:(state)=> {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError:(state, action: PayloadAction<string>) =>{
            state.error = action.payload;
        },
        wsMessage:(state, action: PayloadAction<IDataFeed>) =>{
            state.orders = action.payload;
        },
    },
    selectors:{
        getStatus: (state) => state.status,
        getOrders: (state) => state.orders,
        getError: (state) => state.error
    },
})
export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = allOrdersSlice.actions;
export const {getStatus, getOrders, getError} = allOrdersSlice.selectors;