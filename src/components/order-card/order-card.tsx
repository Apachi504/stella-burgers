import React from 'react'
import styles from './order-card.module.scss'
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import image from '../../img/bun-01.png'
export const OrderCard = () => {
    const today = new Date();
    return (
        <section className={styles.container}>
         <header className={styles.header}>
             <p className={styles.header__number}>#123456</p>
             <p className={styles.header__date}>
                 <FormattedDate
                 date={
                     new Date(
                         today.getFullYear(),
                         today.getMonth(),
                         today.getDate(),
                         today.getHours(),
                         today.getMinutes() - 1,
                         0,
                     )}/></p>
         </header>
            <main className={styles.main}>
            <h3 className={styles.main__title}>Death Star Starship Main бургер</h3>
            </main>
            <div className={styles.composition}>
                <ul className={styles.composition__list}>
                    <li className={styles.composition__item}>
                        <img src={image} alt={'test'} className={styles.composition__img}/>
                    </li>
                    <li className={styles.composition__item}>
                        <img src={image} alt={'test'} className={styles.composition__img}/>
                    </li>
                    <li className={styles.composition__item}>
                        <img src={image} alt={'test'} className={styles.composition__img}/>
                    </li>
                </ul>
            </div>
        </section>
    )
}
