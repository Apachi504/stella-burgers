import React from 'react'
import styles from './modal-overlay.module.scss'
import Modal from '../modal/modal'

const ModalOverlay = ({onClick}) => {
  return (
    <div className={styles.overlay} onClick={onClick}/>
  )
}

export default ModalOverlay
