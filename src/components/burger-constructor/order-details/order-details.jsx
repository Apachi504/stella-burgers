import styles from './order-details.module.scss';
import Done from '../../../img/done.png'


 const OrderDetails = () => {
  return (
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
  );
}

export default OrderDetails