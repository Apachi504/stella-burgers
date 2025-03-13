import {IDataFeed, WebsocketStatus} from "../../utils/types/web-socket-feed";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TAllOrdersState = {
    status: WebsocketStatus;
    order: IDataFeed | null;
    error: string | null;
}

const initialState:TAllOrdersState = {
    status: WebsocketStatus.OFFLINE,
    order: null,
    error: null
}
export const allOrdersSlice = createSlice({
    name: 'allOrders',
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
            state.order = action.payload;
        },
},
    selectors:{
        getStatus: (state) => state.status,
        getOrders: (state) => state.order,
        getError: (state) => state.error
    },
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = allOrdersSlice.actions;
export const {getStatus, getOrders, getError} = allOrdersSlice.selectors;