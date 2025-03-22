import React, {FC, ReactElement, useMemo} from 'react'
import styles from './order-card.module.scss'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/store";
import {IDataFeed, IFeedIngredient} from "../../utils/types/web-socket-feed";
import {getAllIngredients, getIngredients} from "../../services/burger-ingredients/burger-ingredients-slice";
import {Link, useLocation} from "react-router-dom";
import {useModal} from "../../hooks/use-modal";
import {OrderStatus} from "../feed-orders/order-status/order-status";

type TOrderCard = {
    orders: IFeedIngredient,
}
export const OrderCard: FC<TOrderCard> = ({orders}) => {
    const {openModal} = useModal();

    const onModalOpen = () => {
        openModal();
    }
    const location = useLocation();
    const totalItems = orders.ingredients.length;
    const maxItems = 5;
    const remainingItems = totalItems - maxItems;
    const today = new Date(orders.createdAt);
    const getAllIngredient = useSelector(getAllIngredients);
    const {imgIngredients,totalPrice} = useMemo(() => {
        const imgIngredients: ReactElement[] = [];
        const ingredientsToShow = orders.ingredients.slice(0, maxItems + 1); // Берем 7 элементов (6 + overlay)

        const totalPrice = orders.ingredients.reduce((sum: number, ingredientId: string) => {
            const ingredient = getAllIngredient.find((item) => item._id === ingredientId);
            return sum + (ingredient ? ingredient.price : 0);
        }, 0);

        ingredientsToShow.forEach((ingredientId: string, index: number) => {
            const ingredient = getAllIngredient.find((item) => item._id === ingredientId);
            if (!ingredient) return;

            const {image_large} = ingredient;

            if (index === maxItems) {
                imgIngredients.push(
                    <li
                        className={styles.ingredient}
                        key={`overlay-${index}`}
                        style={{zIndex: maxItems - index, right: index * 25}}>
                        <img src={image_large} alt={'test'} className={styles.img}/>
                        <div className={`${styles.last_ingredient} text text_type_digits-default`}>
                            +{remainingItems}
                        </div>
                    </li>
                );
            } else {
                imgIngredients.push(
                    <li
                        className={styles.ingredient}
                        key={`${ingredient._id}-${index}`}
                        style={{zIndex: maxItems - index, right: index * 25}}>
                        <img src={image_large} alt={'test'} className={styles.img}/>
                    </li>
                );
            }
        });

        return {imgIngredients, totalPrice};
    }, [getAllIngredient, orders.ingredients]);

    return (
        <Link
            to={orders.number.toString()}
            state={{backgroundLocation: location, orderNumber: orders}}
            className={styles.link}>
            <section className={styles.container} onClick={onModalOpen}>
                <header className={styles.header}>
                    <p className={styles.header__number}>{`#${orders.number}`}</p>
                    <p className={styles.header__date}>
                        <FormattedDate
                            date={today}/></p>
                </header>
                <main className={styles.main}>
                    <h3 className={styles.main__title}>{orders.name}</h3>
                    {location.pathname === '/profile/orders' && <OrderStatus status={orders?.status}/>}
                </main>
                <div className={styles.composition}>
                    <ul className={styles.composition__list}>
                        {imgIngredients}
                    </ul>
                    <div className={styles.price}>
                        <p className={styles.price__total}>{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </section>
        </Link>
    )
}
