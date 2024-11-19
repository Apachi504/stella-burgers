import styles from './ingredient-details.module.scss'
import PropTypes from 'prop-types'
import Modal from '../../modal/modal'
import {memo} from "react";

const IngredientDetails = ({ burger, onClose }) => {
  return (
    <Modal onClose={onClose} title={"Детали ингредиента"}>
      <section className={styles.card}>
        <img src={burger.image_large} className={styles.image} />
        <span className={styles.details__name}>{burger.name}</span>
        <ul className={styles.details}>
          <li className={`${styles.details__item} mr-5`}>
            <span>Калории, ккал</span>
            <span className={styles.details__value}>
              {burger.calories}   
            </span>
          </li>
          <li className={`${styles.details__item} mr-5`}>
            <span>Белки, г</span>
            <span className={styles.details__value}>
              {burger.proteins}
            </span>
          </li>
          <li className={`${styles.details__item} mr-5`}>
            <span>Жиры, г</span>
            <span className={styles.details__value}>{burger.fat}</span>
          </li>
          <li className={styles.details__item}>
            <span>Углеводы, г</span>
            <span className={styles.details__value}>
              {burger.carbohydrates}
            </span>
          </li>
        </ul>
      </section>
    </Modal>
  )
}
IngredientDetails.propTypes = {
  burger: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired
};
export default memo(IngredientDetails); //IngredientDetails
