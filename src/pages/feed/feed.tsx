import React, {useEffect} from 'react'
import styles from './feed.module.scss'
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import {FeedInfo} from "../../components/feed-info/feed-info";
import {useModal} from "../../hooks/use-modal";
import {OrderInfo} from "../../components/feed-orders/order-info/order-info";
import Modal from "../../components/modal/modal";
import {useDispatch, useSelector} from "../../services/store";
import {wsConnectAllOrders, wsDisconnectAllOrders} from "../../services/get-all-orders/actions";
import {WS_URL} from "../../utils/constant";
import {selectOrders, selectStatus} from "../../services/get-all-orders/selectors";
import Loader from "../../components/loader/loader";

export const Feed = () => {
    const dispatch = useDispatch();
    const order = useSelector(selectOrders);

    useEffect(() => {
        dispatch(wsConnectAllOrders(WS_URL));

        return () => {
            dispatch(wsDisconnectAllOrders());
        };
    }, [dispatch]);

    if (!order || order.length === 0) {
        return <Loader/>;
    }
    return (
        <>
            <section className={styles.container}>
                <h1 className={styles.title}>Лента заказов</h1>
                <main className={styles.main}>
                    <FeedOrders order={order}/>
                    <FeedInfo/>
                </main>
            </section>
        </>
    )
}
