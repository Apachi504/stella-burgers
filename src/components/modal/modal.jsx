import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import styles from './modal.module.scss'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay.jsx'

const modal = document.getElementById('modals');

const Modal = ({ children, title, onClose }) => {
    React.useEffect(() => {
        const closeByEsc = (event) => {
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
            {children}
        </div>
        </>,
        modal
    )
}


Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Modal
