import styles from "./ingredient-group.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item.js";
import {FC, memo} from "react";
import {TIngredient} from "../../../utils/types/prop-types.js";
import {useSelector} from "../../../services/store";
import {getAllIngredients} from "../../../services/burger-ingredients/burger-ingredients-slice";
import React from "react";
import {TIngredientGroup} from "./type";


const IngredientGroup = React.forwardRef<HTMLHeadingElement, TIngredientGroup>(({
title,type, id}, ref) => {
    const burgerIngredients: TIngredient[] = useSelector(getAllIngredients);
    const types = burgerIngredients?.filter((item: TIngredient) => item.type === type);
    return (
        <section id={id}>
            <h2 className={styles.title} ref={ref}>{title}</h2>
            <ul className={styles.list}>
                {types?.map((ingredient: TIngredient) => {
                    return (
                        <IngredientItem ingredient={ingredient} key={ingredient._id}/>
                    );
                })}
            </ul>
        </section>
    );
});
export default memo(IngredientGroup);
