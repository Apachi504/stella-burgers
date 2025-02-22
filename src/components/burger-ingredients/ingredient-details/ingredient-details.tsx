import styles from "./ingredient-details.module.scss";
import {FC, memo} from "react";
import {TIngredientDetailsProps} from "./type";

const IngredientDetails: FC<TIngredientDetailsProps> = ({ingredient}) => {
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

export default memo(IngredientDetails);
