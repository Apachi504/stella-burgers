import React, {memo} from 'react'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-items.module.scss'
import PropTypes from 'prop-types'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';

const IngredientItems = ({count, burger, id}) => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    function handleOpenModal() {
        setIsOpenModal(true);
    }

    function handleCloseModal() {
        setIsOpenModal(false);
    }

    return (
        <>
            <li key={id} className={styles.item} onClick={handleOpenModal}>
        <span className={styles.img}>
          <img src={burger.image} alt={burger.name}/>
          <Counter count={count} size='default' extraClass='m-1'/>
        </span>
                <span className={styles.total}>
          <p className={styles.price}>{burger.price}</p>
          <CurrencyIcon type="primary"/>
        </span>
                <p className={styles.name}>{burger.name}</p>
            </li>
            {isOpenModal && <IngredientDetails burger={burger} id={id} onClose={handleCloseModal}/>}
        </>
    )
}
IngredientItems.propTypes = {
    burger: PropTypes.object.isRequired,
    id: PropTypes.string,
    count: PropTypes.number.isRequired
}
export default memo(IngredientItems);
