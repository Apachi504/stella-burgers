import {TOrder} from "./prop-types";

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export interface IFeedIngredient {
    _id: string,
    createdAt: string,
    updatedAt: string,
    status: 'created' | 'pending' | 'done',
    number: number,
    name: string,
    ingredients: string[],
    orders?: TOrder
}

export interface IDataFeed {
    success: boolean;
    total: number;
    totalToday: number;
    orders: IFeedIngredient[];
}