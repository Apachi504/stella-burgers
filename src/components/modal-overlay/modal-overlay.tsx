import React, {FC} from 'react'
import styles from './modal-overlay.module.scss'
import {TModalOverlay} from "./type";

const ModalOverlay: FC<TModalOverlay> = ({onClick}) => {
    return (
        <div className={styles.overlay} onClick={onClick}/>
    )
}

export default ModalOverlay
