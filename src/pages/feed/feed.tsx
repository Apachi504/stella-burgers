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
import {getOrders, getStatus} from "../../services/get-all-orders/get-all-orders-slice";

export const Feed = () => {
    const {isModalOpen, openModal, closeModal} = useModal();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.allOrders.order?.orders);
    const status = useSelector(getStatus);
    useEffect(() => {
        dispatch(wsConnectAllOrders(WS_URL));
        return () => {
            dispatch(wsDisconnectAllOrders());
        }
    }, [dispatch])
console.log(status);
    return (
        <>
            <section className={styles.container}>
                <h1 className={styles.title}>Лента заказов</h1>
                <main className={styles.main}>
                    <FeedOrders openModal={openModal} order={order}/>
                    <FeedInfo/>
                </main>
                {
                    isModalOpen && (
                        <Modal orderNumber={'03453'} onClose={closeModal}>
                            <OrderInfo/>
                        </Modal>
                    )
                }
            </section>
        </>
    )
}
