import {TConstructor, TIngredient} from "../../utils/prop-types";

export type TBurgerConstructor = {
    bun: TIngredient | null;
    ingredients: TConstructor[];
}