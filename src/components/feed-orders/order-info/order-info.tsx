import React, {FC} from 'react'
import styles from './order-info.module.scss'
import {Composition} from "../composition/composition";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
export const OrderInfo: FC = () => {
    const today = new Date();
    return (
        <section className={styles.order}>
            <div className={styles.order__text}>
                <h3 className={styles.order__title}>Black Hole Singularity острый бургер с беконом и грибами</h3>
                <p className={styles.order__status}>Выполнен</p>
            </div>
            <div className={styles.order__composition}>
                <p className={styles.order__composition__title}>Состав:</p>
                <ul className={styles.order__composition__list}>
                    <Composition/>
                    <Composition/>
                    <Composition/>
                    <Composition/>
                    <Composition/>
                </ul>
            </div>
            <div className={styles.order__price}>
                <p className={styles.order__price__date}>
                    <FormattedDate
                        date={today}/>
                </p>
                <div className={styles.order__price__total}>
                <p className={styles.order__price__total__text}>12500</p>
                <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
    )
}
