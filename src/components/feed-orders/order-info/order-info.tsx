import React, {FC, useMemo} from 'react'
import styles from './order-info.module.scss'
import {Composition} from "../composition/composition";
import { FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import { IFeedIngredient} from "../../../utils/types/web-socket-feed";
import {useSelector} from "../../../services/store";
import {getAllIngredients} from "../../../services/burger-ingredients/burger-ingredients-slice";
import {TIngredient} from "../../../utils/types/prop-types";
import {OrderPrice} from "../order-price/order-price";
import {OrderStatus} from "../order-status/order-status";
type TFeedIngredient ={
    order: IFeedIngredient
}
type TIngredientWithCount = {
    ingredient: TIngredient;
    count: number;
};
export const OrderInfo: FC<TFeedIngredient> = ({order}) => {
    const today = new Date(order.createdAt);
    const ingredients :TIngredient[]= useSelector(getAllIngredients);

    const orderIngredients = useMemo(() => {
        return order.ingredients.map(id => {
            return ingredients.find(ingredient => ingredient._id === id);
        }).filter(ingredient => {
            return ingredient;
        }) as TIngredient[];
    }, [ingredients, order]);

    const ingredientWithCountList = useMemo(() => {
        const result: TIngredientWithCount[] = [];
        orderIngredients.forEach(ingredient => {
            const foundItem = result.find(item => item.ingredient._id === ingredient._id)
            if (foundItem) {
                foundItem.count += 1;
            } else {
                result.push({ingredient: ingredient, count: 1})
            }
        })
        result.sort((a, b) => a.ingredient.type === 'bun' ? -1 : b.ingredient.type === 'bun' ? 1 : 0);
        return result
    }, [orderIngredients]);
    return (
        <section className={styles.order}>
            <div className={styles.order__text}>
                <h3 className={styles.order__title}>{order.name}</h3>
                <OrderStatus status={order?.status}/>
            </div>
            <div className={styles.order__composition}>
                <p className={styles.order__composition__title}>Состав:</p>
                <ul className={styles.order__composition__list}>
                    {ingredientWithCountList.map((item) => {
                        return (
                            <Composition key={item.ingredient._id} ingredient={item.ingredient} count={item.count}/>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.order__price}>
                <p className={styles.order__price__date}>
                    <FormattedDate
                        date={today}/>
                </p>
                <OrderPrice orderIngredients={orderIngredients}/>
            </div>
        </section>
    )
}
