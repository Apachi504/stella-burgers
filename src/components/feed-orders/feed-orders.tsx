import React, {FC} from 'react'
import styles from './feed-orders.module.scss'
import {OrderCard} from "../order-card/order-card";
import {TOrder} from "../../utils/types/prop-types";
import {IFeedIngredient} from "../../utils/types/web-socket-feed";
export type TFeedOrdersProps = {
    order: Array<IFeedIngredient>,
}
export const FeedOrders: FC<TFeedOrdersProps> = ({order}) => {
    return (
        <section className={styles.container}>
            {order.map((item) => (
                <OrderCard orders={item}
                 key={item._id}/>))
            }
        </section>
    )
}

