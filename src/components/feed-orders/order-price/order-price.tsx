import React, {FC, useMemo} from 'react'
import styles from "../order-info/order-info.module.scss";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../../utils/types/prop-types";

type TOrderPriceProps = {
    orderIngredients: TIngredient[];
}
export const OrderPrice: FC<TOrderPriceProps> = ({orderIngredients}) => {
    const total = useMemo(() => {
        return orderIngredients.reduce((result, item) => result + (item.price ?? 0), 0);
    }, [orderIngredients]);
    return (
        <div className={styles.order__price__total}>
            <p className={styles.order__price__total__text}>{total}</p>
            <CurrencyIcon type="primary"/>
        </div>
    )
}
