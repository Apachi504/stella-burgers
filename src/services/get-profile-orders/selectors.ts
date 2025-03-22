import {RootState} from "../store";

export const selectStatusProfile = (state: RootState) => state.profileOrders.status;
export const selectErrorProfile = (state: RootState) => state.profileOrders.error;
export const selectOrdersProfile = (state: RootState) => state.profileOrders.orders?.orders;