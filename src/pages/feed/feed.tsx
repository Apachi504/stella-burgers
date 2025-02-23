import React from 'react'
import styles from './feed.module.scss'
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import {FeedInfo} from "../../components/feed-info/feed-info";

export const Feed = () => {
    return (
       <>
           <section className={styles.container}>
            <h1 className={styles.title}>Лента заказов</h1>
               <main className={styles.main}>
                   <FeedOrders/>
                   <FeedInfo/>
               </main>
           </section>
       </>
    )
}
