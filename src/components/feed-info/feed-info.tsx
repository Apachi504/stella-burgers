import React, {FC, useMemo} from 'react'
import styles from './feed-info.module.scss'
import {useSelector} from "../../services/store";
import {selectTotal, selectTotalToday} from "../../services/get-all-orders/selectors";

export const FeedInfo: FC = () => {
    const totalToday = useSelector(selectTotalToday);
    const totalAllTime = useSelector(selectTotal);
    const orders = useSelector(state => state.allOrders.order?.orders);
    const {doneOrders,inWorkOrders} = useMemo(
        () => ({
            doneOrders: orders?.map((item) => (item.status === 'done' ? item.number : null)),
            inWorkOrders: orders?.map((item) => (item.status === 'pending' ? item.number : null)),
        }),
        [orders]
    );
    return (
        <main className={styles.container}>
            <section className={styles.order__status}>
                <div className={styles.order__feeds}>
                    <h3 className={`${styles.order__title} mb-6`}>Готовы:</h3>
                    <ul className={styles.order__number_status}>
                        {/*нужно чтобы было максимум 10 заказов*/}
                        {
                            doneOrders?.map((item, index) =>
                                index < 10 ? (
                                <li className={`${styles.order__number_done} ${styles.order__number}`} key={index}>{item}</li>
                            ) :
                                null
                            )
                        }

                    </ul>
                </div>
                <div className={styles.order__feeds}>
                    <h3 className={`${styles.order__title} mb-6`}>В работе:</h3>
                    <div className={styles.order__number_status}>
                        <ul className={styles.order__number_status}>
                            {
                                inWorkOrders?.map((item, index) =>
                                    index < 10 ? (
                                        <li className={`${styles.order__number_inwork} ${styles.order__number}`} key={index}>{item}</li>
                                    ) :
                                        null
                                )
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section className={styles.order__all}>
                <p className={`${styles.order__title} mb-1`}>Выполнено за все время:</p>
                <p className={styles.order__all__number}>{totalAllTime}</p>
            </section>
            <section className={styles.order__today}>
                <p className={`${styles.order__title} mb-1`}>Выполнено за сегодня:</p>
                <p className={styles.order__all__number}>{totalToday}</p>
            </section>
        </main>
    )
}
