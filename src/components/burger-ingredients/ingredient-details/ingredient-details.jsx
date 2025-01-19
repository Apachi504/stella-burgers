import styles from "./ingredient-details.module.scss";
import PropTypes from "prop-types";
import { memo } from "react";
import { ingredientsPropTypes } from "../../../utils/prop-types";

const IngredientDetails = ({src,name,calories,proteins,fat,carbohydrates}) => {

  return (
    <section className={styles.card}>
      <img
        src={src}
        alt={name}
      />
      <span className={styles.details__name}>{name}</span>
      <ul className={styles.details}>
        <li className={`${styles.details__item} mr-5`}>
          <span>Калории, ккал</span>
          <span className={styles.details__value}>{calories}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Белки, г</span>
          <span className={styles.details__value}>{proteins}</span>
        </li>
        <li className={`${styles.details__item} mr-5`}>
          <span>Жиры, г</span>
          <span className={styles.details__value}>{fat}</span>
        </li>
        <li className={styles.details__item}>
          <span>Углеводы, г</span>
          <span className={styles.details__value}>{carbohydrates}</span>
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
