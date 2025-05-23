import {IDataFeed, WebsocketStatus} from "../../utils/types/web-socket-feed";
import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";

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
 const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING;
        })
        .addCase(wsOpen, (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.error = null;
        })
        .addCase(wsClose, (state) => {
            state.status = WebsocketStatus.OFFLINE;
            state.orders = null;
        })
        .addCase(wsError, (state, action:PayloadAction<string>) => {
            state.error = action.payload;
        })
        .addCase(wsMessage, (state, action: PayloadAction<IDataFeed>) => {
            state.orders = action.payload;
    })
 })

 export default profileOrdersReducer