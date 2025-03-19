import styles from "./profile-order.module.scss";
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import React, {useEffect} from "react";
import Modal from "../../components/modal/modal";
import {OrderInfo} from "../../components/feed-orders/order-info/order-info";
import {useModal} from "../../hooks/use-modal";
import {useDispatch, useSelector} from "../../services/store";
import {selectOrdersProfile} from "../../services/get-profile-orders/selectors";
import {wsConnectProfileOrders, wsDisconnectProfileOrders} from "../../services/get-profile-orders/actions";
import {WS_USER_URL} from "../../utils/constant";
import Loader from "../../components/loader/loader";
import {OrderCard} from "../../components/order-card/order-card";

function ProfileOrders() {
    const dispatch = useDispatch();
    const order = useSelector(selectOrdersProfile);

    useEffect(() => {
            dispatch(wsConnectProfileOrders(WS_USER_URL()));
        return () => {
            dispatch(wsDisconnectProfileOrders());
        };
    },[dispatch]);
    if (!order || order.length === 0) {
        return <Loader/>;
    }
    return (
        <section className={styles.container}>
            {order.map((item) => (
                <OrderCard orders={item}
                           status={item.status as "created" | "pending" | "done"}
                           key={item._id}/>)).reverse()
            }
        </section>
    );
}

export default ProfileOrders;