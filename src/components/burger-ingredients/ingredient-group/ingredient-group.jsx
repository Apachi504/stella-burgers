import PropTypes from 'prop-types';
import styles from './ingredient-group.module.scss';
import IngredientItems from '../ingredient-items/ingredient-items';
import {memo} from "react";


const IngredientGroup = ({burger, title, type, id}) => {
    const types = burger.data && burger.data.filter(item => item.type === type);
    return (
        <section id={id}>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.list}>
                {burger.data && types.map((burger) => {
                    return <IngredientItems burger={burger} key={burger._id} count={1}/>
                })}
            </ul>
        </section>
    )
}

IngredientGroup.propTypes = {
    burger: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default memo(IngredientGroup);

