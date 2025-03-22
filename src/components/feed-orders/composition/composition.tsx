import React, {FC} from 'react'
import styles from "../../feed-orders/composition/composition.module.scss";
import image from "../../../img/bun-01.png";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../../utils/types/prop-types";

type TCompositionProps = {
    ingredient: TIngredient;
    count: number;
}
export const Composition:FC<TCompositionProps> = ({ingredient, count}) => {
    return (
        <li className={styles.composition}>
            <div className={styles.composition__line}>
            <div className={styles.composition__item}>
                <img src={ingredient.image} alt={'test'} className={styles.composition__img}/>
            </div>
            <span className={styles.composition__text}>{ingredient.name}</span>
            </div>
                <div className={styles.price}>
                <p className={styles.price__total}>{`${count} x ${ingredient.price}`}</p>
                <CurrencyIcon type="primary"/>
            </div>
        </li>
    )
}
