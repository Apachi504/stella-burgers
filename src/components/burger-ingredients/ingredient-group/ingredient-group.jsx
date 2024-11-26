import PropTypes from "prop-types";
import styles from "./ingredient-group.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import { memo } from "react";
import { ingredientsPropTypes } from "../../../utils/prop-types";

const IngredientGroup = ({ burger, title, type, id }) => {
  const types = burger.data && burger.data.filter((item) => item.type === type);
  return (
    <section id={id}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {burger.data &&
          types.map((burger) => {
            return (
              <IngredientItem burger={burger} key={burger._id} count={1} />
            );
          })}
      </ul>
    </section>
  );
};

IngredientGroup.propTypes = {
  burger: PropTypes.shape(ingredientsPropTypes).isRequired,
};
export default memo(IngredientGroup);
