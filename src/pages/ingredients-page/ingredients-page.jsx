import {useParams} from "react-router-dom";
import React, { useMemo} from "react";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details.jsx";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import styles from "./ingredients-page.module.scss";
export const IngredientPage = () => {
    const {id} = useParams();
    const burgerIngredients = useSelector(getAllIngredients);

    const ingredient = useMemo(() => {
        return burgerIngredients?.data?.find((item) => item._id === id);
    }, [burgerIngredients.data, id]);

    return (
        ingredient && <section className={styles.container}>
            <h2 className={styles.title}>Детали ингредиента</h2>
            <IngredientDetails ingredient={ingredient}/>
        </section>

    );
};