import styles from "./ingredient-details.module.scss";
import PropTypes from "prop-types";
import { memo } from "react";
import { ingredientsPropTypes } from "../../../utils/prop-types";

const IngredientDetails = ({ burger }) => {
  return (
    <section className={styles.card}>
      <img
        src={burger.image_large}
        className={styles.image}
        alt={burger.name}
      />
      <span className={styles.details__name}>{burger.name}</span>
      <ul className={styles.details}>
        <li className={`${styles.details__item} mr-5`}>
          <span>Калории, ккал</span>
          <span className={styles.details__value}>{burger.calories}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Белки, г</span>
          <span className={styles.details__value}>{burger.proteins}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Жиры, г</span>
          <span className={styles.details__value}>{burger.fat}</span>
        </li>
        <li className={styles.details__item}>
          <span>Углеводы, г</span>
          <span className={styles.details__value}>{burger.carbohydrates}</span>
        </li>
      </ul>
    </section>
  );
};
IngredientDetails.propTypes = {
  burger: PropTypes.shape(ingredientsPropTypes).isRequired,
};
export default memo(IngredientDetails);
