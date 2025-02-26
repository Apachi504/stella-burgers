import React from 'react'
import styles from './feed.module.scss'
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import {FeedInfo} from "../../components/feed-info/feed-info";
import {useModal} from "../../hooks/use-modal";
import {OrderInfo} from "../../components/feed-orders/order-info/order-info";
import Modal from "../../components/modal/modal";
export const Feed = () => {
    const {isModalOpen, openModal, closeModal} = useModal();
    return (
       <>
           <section className={styles.container}>
            <h1 className={styles.title}>Лента заказов</h1>
               <main className={styles.main}>
                   <FeedOrders openModal={openModal}/>
                   <FeedInfo/>
               </main>
               {
                   isModalOpen &&(
                       <Modal orderNumber={'03453'} onClose={closeModal}>
                           <OrderInfo/>
                       </Modal>
                   )
               }
           </section>
       </>
    )
}
