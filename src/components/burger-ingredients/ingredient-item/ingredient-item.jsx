import React, { memo } from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.scss'
import PropTypes from 'prop-types'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { useModal } from '../../../hooks/use-modal';
import Modal from "../../modal/modal.jsx";

const IngredientItem = ({ count, burger, id }) => {

const { isModalOpen, openModal, closeModal } = useModal();
    
    return (
        <>
            <li className={styles.item} onClick={openModal}>
                <span className={styles.img}>
                    <img src={burger.image} alt={burger.name} />
                    <Counter count={count} size='default' extraClass='m-1' />
                </span>
                <span className={styles.total}>
                    <p className={styles.price}>{burger.price}</p>
                    <CurrencyIcon type="primary" />
                </span>
                <p className={styles.name}>{burger.name}</p>
            </li>
            {isModalOpen && <Modal onClose={closeModal} title={"Детали ингредиента"}>
            <IngredientDetails burger={burger} id={id}/>
            </Modal>}    
        </>
    )
}
IngredientItem.propTypes = {
    burger: PropTypes.object.isRequired,
    id: PropTypes.string,
    count: PropTypes.number.isRequired
}
export default memo(IngredientItem);
