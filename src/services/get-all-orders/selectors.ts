import { RootState } from "../store";
import {createSelector} from "@reduxjs/toolkit";

export const selectStatus = (state: RootState) => state.allOrders.status;
export const selectOrders = (state: RootState) => state.allOrders.order?.orders;
export const selectError = (state: RootState) => state.allOrders.error;
export const selectTotal = (state: RootState) => state.allOrders.order?.total;
export const selectTotalToday = (state: RootState) => state.allOrders.order?.totalToday;

