import React, {FC} from 'react'
import styles from './order-card.module.scss'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TFeedOrdersProps} from "../feed-orders/feed-orders";
import {OrderImg} from "./order-img/order-img";
import {useSelector} from "../../services/store";
import {getOrders} from "../../services/get-all-orders/get-all-orders-slice";

export const OrderCard: FC<TFeedOrdersProps> = ({openModal}) => {
    const order = useSelector(getOrders);
    const onModalOpen = () => {
        openModal();
    }
    const today = new Date();
    return (
        <section className={styles.container} onClick={onModalOpen}>
         <header className={styles.header}>
             <p className={styles.header__number}>#123456</p>
             <p className={styles.header__date}>
                 <FormattedDate
                 date={today}/></p>
         </header>
            <main className={styles.main}>
            <h3 className={styles.main__title}>Death Star Starship Main frame with custom бургер</h3>
            </main>
            <div className={styles.composition}>
                <ul className={styles.composition__list}>
                    <OrderImg/>
                    <OrderImg/>
                    <OrderImg/>
                    <OrderImg/>
                </ul>
                <div className={styles.price}>
                    <p className={styles.price__total}>480</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
    )
}
