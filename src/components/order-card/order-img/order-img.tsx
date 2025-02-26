import React, {FC} from 'react'
import styles from "../../order-card/order-img/order-img.module.scss";
import image from "../../../img/bun-01.png";

export const OrderImg:FC = () => {
    return (
        <li className={styles.item} style={{zIndex: 6, right: 0}}>
            <img src={image} alt={'test'} className={styles.img}/>
        </li>
    )
}
