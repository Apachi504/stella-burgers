import React, {FC} from 'react'
import styles from './feed-orders.module.scss'
import {OrderCard} from "../order-card/order-card";
export type TFeedOrdersProps = {
    openModal: () => void
}
export const FeedOrders: FC<TFeedOrdersProps> = ({openModal}) => {
    return (
        <section className={styles.container}>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
            <OrderCard openModal={openModal}/>
        </section>
    )
}

