import {TIngredient} from "../../utils/prop-types";

export type TBurgerIngredientsState = {
    burgerIngredients: TIngredient[];
    burgerIngredientsLoading: boolean;
    burgerIngredientsError: null | boolean;
}