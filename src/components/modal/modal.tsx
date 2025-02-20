import React, {FC, ReactNode} from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import styles from './modal.module.scss'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay.js'
import {TModal} from "./type";


const modal = document.getElementById('modals');

const Modal: FC<TModal> = ({ children, title, onClose }) => {
    React.useEffect(() => {
        const closeByEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeByEsc);
        return () => {
            document.removeEventListener('keydown', closeByEsc);
        };
    }, [onClose]);

    return createPortal(
        <>
        <ModalOverlay onClick={onClose} />
        <div className={styles.modal}>
        <header className={styles.header}>
            <h2 className="text text_type_main-large">
                {title}
            </h2>
            <button>
                <CloseIcon type="primary" onClick={onClose} />
            </button>
        </header>
            <div className={styles.content}>
            {children}
            </div>
        </div>
        </>,
        modal as HTMLElement
    )
}
export default Modal
