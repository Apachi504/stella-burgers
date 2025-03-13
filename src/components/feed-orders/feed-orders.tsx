import React, {FC} from 'react'
import styles from './feed-orders.module.scss'
import {OrderCard} from "../order-card/order-card";
import {TOrder} from "../../utils/types/prop-types";
import {IDataFeed} from "../../utils/types/web-socket-feed";
export type TFeedOrdersProps = {
    openModal: () => void,
    order: IDataFeed|null
}
export const FeedOrders: FC<TFeedOrdersProps> = ({openModal,order}) => {
console.log('orders feed', order?.orders);
    return (
        <section className={styles.container}>
            {order?.orders.map((item) => (<OrderCard openModal={openModal} order={item}/>))}
            {/*<OrderCard openModal={openModal} order={order}/>*/}
        </section>
    )
}

