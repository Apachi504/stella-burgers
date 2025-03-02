import {TIngredient, TOrder} from "../../utils/prop-types";

export type TOrderState = {
    orders:TOrder| null, // Данные заказа
    ordersLoading: boolean, // Флаг загрузки
    ordersError: boolean, // Сообщение об ошибке
}
export type TIngredients = {
    bun: TIngredient;
    ingredients: TIngredient[];
};