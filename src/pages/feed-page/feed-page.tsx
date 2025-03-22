import React, {FC, useEffect, useMemo} from 'react'
import styles from "../ingredients-page/ingredients-page.module.scss";
import {useLocation, useParams} from "react-router-dom";
import {OrderInfo} from "../../components/feed-orders/order-info/order-info";
import {wsConnectAllOrders, wsDisconnectAllOrders} from "../../services/get-all-orders/actions";
import {WS_URL, WS_USER_URL} from "../../utils/constant";
import {useDispatch, useSelector} from "../../services/store";
import {IFeedIngredient} from "../../utils/types/web-socket-feed";
import {wsConnectProfileOrders, wsDisconnectProfileOrders} from "../../services/get-profile-orders/actions";

export const FeedPage: FC = () => {
    const {number} = useParams<{ number: string }>();
    const order = useSelector(state => state.allOrders.order?.orders || []);
    const dispatch = useDispatch();
    const location = useLocation();
    const orderId = number ? parseInt(number, 10) : undefined;
    const orders = useMemo(() => order?.find((item: IFeedIngredient) => item.number === orderId), [number, order]);
    useEffect(() => {
        location.pathname === 'profile' ? dispatch(wsConnectProfileOrders(WS_USER_URL())) :
            dispatch(wsConnectAllOrders(WS_URL));
        return () => {
            location.pathname === 'profile' ? dispatch(wsDisconnectProfileOrders()) :
                dispatch(wsDisconnectAllOrders());
        };
    }, [dispatch]);
    return (
        orders &&
        <section className={styles.container}>
            <h2 className={styles.title}>{`#${number}`}</h2>
            <OrderInfo order={orders}/>
        </section>
    )
}
