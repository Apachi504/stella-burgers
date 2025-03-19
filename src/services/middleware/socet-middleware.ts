import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../store";
import {fetchWithRefresh} from "../../utils/api";

export type TWsActionTypes<R, S> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
    sendMessage?: ActionCreatorWithPayload<S>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <R, S>(
    wsActions: TWsActionTypes<R, S>,
    withTokenRefresh: boolean = false
): Middleware<Record<string, never>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            onConnecting,
            onOpen,
            onClose,
            onError,
            onMessage,
            sendMessage
        } = wsActions;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";

        return (next) => {
            return (action) => {
                const {dispatch} = store;

                if (connect.match(action)) {
                    url = action.payload;
                    socket = new WebSocket(action.payload);
                    onConnecting && dispatch(onConnecting());
                    isConnected = true;

                    socket.onopen = () => {
                        onOpen && dispatch(onOpen());
                    };

                    socket.onerror = () => {
                        dispatch(onError("WebSocket error: " + onError));
                    };

                    socket.onmessage = (event) => {
                        const {data} = event;

                        try {
                            const parsedData = JSON.parse(data);
                            //
                            // console.log(parsedData);

                            if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                                // @ts-ignore
                                fetchWithRefresh(`${url}/auth/token`, {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'}
                                })
                                    .then(refreshToken => {
                                        const wssUrl = new URL(url);
                                        wssUrl.searchParams.set(
                                            "token",

                                           refreshToken.accessToken = (localStorage.getItem("accessToken") ?? "").replace("Bearer ", "")
                                            // refreshToken.accessToken.replace("Bearer ", "")
                                        );
                                        dispatch(connect(wssUrl.toString()));
                                    })
                                    .catch(err => {
                                        dispatch(onError((err as Error).message));
                                    });

                                dispatch(disconnect());

                                return;
                            }

                            dispatch(onMessage(parsedData));
                        } catch (err) {
                            dispatch(onError((err as Error).message));
                        }
                    };

                    socket.onclose = () => {
                        onClose && dispatch(onClose());

                        if (isConnected) {
                            reconnectTimer = window.setTimeout(() => {
                                // dispatch(wsConnect(url));
                                dispatch(connect(url));
                            }, RECONNECT_PERIOD);
                        }
                    };
                }

                if (socket && sendMessage?.match(action)) {
                    try {
                        socket.send(JSON.stringify(action.payload));
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }
                }

                if (socket && disconnect.match(action)) {
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close(1000, "Client disconnected");
                    socket = null;
                }

                next(action);
            };
        }
    }
}