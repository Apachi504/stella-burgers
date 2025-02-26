import React, {FC} from 'react'
import styles from "../../feed-orders/composition/composition.module.scss";
import image from "../../../img/bun-01.png";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const Composition:FC = () => {
    return (
        <li className={styles.composition}>
            <div className={styles.composition__line}>
            <div className={styles.composition__item}>
                <img src={image} alt={'test'} className={styles.composition__img}/>
            </div>
            <span className={styles.composition__text}>Флюоресцентная булка R2-D3</span>
            </div>
                <div className={styles.price}>
                <p className={styles.price__total}>2 x 480</p>
                <CurrencyIcon type="primary"/>
            </div>
        </li>
    )
}
