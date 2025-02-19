import React, { memo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.scss";
import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
  setIngredientDetails
} from "../../../services/ingredient-details/ingredient-details-slice.js";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

const IngredientItem = ({  ingredient, openModal}) => {
  const burgerIngredients = useSelector(state => state.burgerConstructor);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = ingredient._id;
const modal = ()=>{
    dispatch(setIngredientDetails(ingredient));
    openModal();
}
const [, dragRef] = useDrag({
  type: ingredient.type === "bun" ? "bun" : "stuffing",
  item: ingredient
})
  const count = ingredient.type === "bun"
    ? (burgerIngredients.bun?._id === ingredient._id ? 2 : 0)
    : burgerIngredients.ingredients.reduce((acc, el) => el._id === ingredient._id ? acc + 1 : acc, 0);

  return (
      <Link
            state={{backgroundLocation: location, ingredient: ingredient}}
            to={`ingredients/${id}`}  className={styles.link}>
      <li className={styles.item} onClick={modal} ref={dragRef}  >
        <span className={styles.img}>
          <img src={ingredient.image} alt={ingredient.name} />
          {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        </span>
        <span className={styles.total}>
          <p className={styles.price}>{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </span>
        <p className={styles.name}>{ingredient.name}</p>
      </li>
      </Link>
  );
};
IngredientItem.propTypes = {
  ingredient:ingredientsPropTypes,
  openModal: PropTypes.func
};
export default memo(IngredientItem);
