import React, {FC} from 'react'
import styles from './feed-orders.module.scss'
import {OrderCard} from "../order-card/order-card";
export const FeedOrders: FC = () => {
    return (
        <section className={styles.container}>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </section>
    )
}

