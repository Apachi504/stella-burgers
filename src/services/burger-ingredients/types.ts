import {TIngredient} from "../../utils/types/prop-types";

export type TBurgerIngredientsState = {
    burgerIngredients: TIngredient[];
    burgerIngredientsLoading: boolean;
    burgerIngredientsError: null | boolean;
}