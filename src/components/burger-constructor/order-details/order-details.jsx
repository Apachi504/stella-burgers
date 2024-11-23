import PropTypes from 'prop-types';
import Modal from '../../modal/modal';
import styles from './order-details.module.scss';
import Done from '../../../img/done.png'


 const OrderDetails = ({onClose}) => {
  return (
      // <Modal onClose={onClose} title={null}>
      <>
        <div className={styles.constructor__container}>
          <span className={styles.constructor__namber}>
            034536
            </span>
          <span className={styles.constructor__title}>
            идентификатор заказа
            </span>
          <img src={Done} alt='done' className={styles.constructor__img}/>
          <span className={styles.constructor__subtitle}>
            Ваш заказ начали готовить
            </span>
          <span className={styles.constructor__description}>
            Дождитесь готовности на орбитальной станции
          </span>
        </div>   
      </>       
      // </Modal>
  );
}

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired
}
export default OrderDetails