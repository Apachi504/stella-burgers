import {IDataFeed, WebsocketStatus} from "../../utils/types/web-socket-feed";
import {createReducer, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "./actions";

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
const allOrdersReducer = createReducer(initialState, (builder) => {
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
            state.order = null;
        })
        .addCase(wsError, (state, action:PayloadAction<string>) => {
            state.error = action.payload;
        })
        .addCase(wsMessage, (state, action: PayloadAction<IDataFeed>) => {
            state.order = action.payload;
        });
}
 );
export default allOrdersReducer;