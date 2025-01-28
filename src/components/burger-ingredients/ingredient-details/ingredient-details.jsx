import styles from "./ingredient-details.module.scss";
import PropTypes from "prop-types";
import { memo } from "react";
import { ingredientsPropTypes } from "../../../utils/prop-types";
import {useParams} from "react-router";

const IngredientDetails = ({ingredient}) => {
  return (
    <section className={styles.card}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <span className={styles.details__name}>{ingredient.name}</span>
      <ul className={styles.details}>
        <li className={`${styles.details__item} mr-5`}>
          <span>Калории, ккал</span>
          <span className={styles.details__value}>{ingredient.calories}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Белки, г</span>
          <span className={styles.details__value}>{ingredient.proteins}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Жиры, г</span>
          <span className={styles.details__value}>{ingredient.fat}</span>
        </li>
        <li className={styles.details__item}>
          <span>Углеводы, г</span>
          <span className={styles.details__value}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </section>
  );
};
IngredientDetails.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
};
export default memo(IngredientDetails);
