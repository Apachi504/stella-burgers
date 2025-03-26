import {TIngredient, TOrder} from "../../utils/types/prop-types";

export type TOrderState = {
    orders:TOrder| null, // Данные заказа
    ordersLoading: boolean, // Флаг загрузки
    ordersError:string | null, // Сообщение об ошибке
}
export type TIngredients = {
    bun: TIngredient;
    ingredients: TIngredient[];
};