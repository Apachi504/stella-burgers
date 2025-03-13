import {TConstructor, TIngredient} from "../../utils/types/prop-types";

export type TBurgerConstructor = {
    bun: TIngredient | null;
    ingredients: TConstructor[];
}