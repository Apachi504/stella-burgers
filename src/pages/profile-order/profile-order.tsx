import styles from "./profile-order.module.scss";
import {FeedOrders} from "../../components/feed-orders/feed-orders";
import React from "react";
import Modal from "../../components/modal/modal";
import {OrderInfo} from "../../components/feed-orders/order-info/order-info";
import {useModal} from "../../hooks/use-modal";

function ProfileOrders() {
    const {isModalOpen, openModal, closeModal} = useModal();
    return (
        <div className={styles.container}>
            <FeedOrders openModal={openModal}/>
            {
                isModalOpen &&(
                    <Modal orderNumber={'03453'} onClose={closeModal}>
                        <OrderInfo/>
                    </Modal>
                )
            }
        </div>
    );
}
export default  ProfileOrders;