import PropTypes from "prop-types";
import styles from "./ingredient-group.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import {memo} from "react";
import {ingredientsPropTypes} from "../../../utils/prop-types";
import {useSelector} from "react-redux";
import {getAllIngredients} from "../../../services/burger-ingredients/burger-ingredients-slice.js";
import React from "react";

const IngredientGroup = React.forwardRef(({title, type, id,openModal},ref)=> {
    const burgerIngredients = useSelector(getAllIngredients);
    const types = burgerIngredients?.data?.filter((item) => item.type === type);
    return (
        <section id={id}>
            <h2 className={styles.title} ref={ref}>{title}</h2>
            <ul className={styles.list}>
                {types?.map((ingredient) => {
                        return (
                            <IngredientItem ingredient={ingredient} key={ingredient._id} openModal={openModal} />
                        );
                    })}
            </ul>
        </section>
    );
});

IngredientGroup.propTypes = {
    burger: ingredientsPropTypes,
    openModal: PropTypes.func
};
export default IngredientGroup;
