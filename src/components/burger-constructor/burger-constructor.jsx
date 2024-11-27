import React, { memo } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon,Button,CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import OrderDetails from "./order-details/order-details.jsx";
import { useModal } from "../../hooks/use-modal";
import Modal from "../modal/modal.jsx";
import { ingredientsPropTypes } from "../../utils/prop-types.js";
const BurgerConstructor = ({ burger }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.container}>
      <ConstructorElement
        type="top"
        extraClass={"ml-8"}
        isLocked={true}
        text={`${burger.data && burger.data[7].name} (верх)`}
        price={burger.data && burger.data[7].price}
        thumbnail={burger.data && burger.data[7].image}
      />
      <span className={styles.content}>
        {burger.data &&
          burger.data
            .filter((item) => item.type !== "bun")
            .map((el, id) => (
              <ul key={id} className={styles.group}>
                <DragIcon type="primary" />
                <ConstructorElement
                  style={{ width: "100%" }}
                  key={id}
                  type="main"
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </ul>
            ))}
      </span>
      <ConstructorElement
        type="bottom"
        extraClass={"ml-8"}
        isLocked={true}
        text={`${burger.data && burger.data[7].name} (низ)`}
        price={burger.data && burger.data[7].price}
        thumbnail={burger.data && burger.data[7].image}
      />
      <div className={styles.submit}>
        <div className={styles.total}>
          <p className={styles.total__price}>650</p>
          <CurrencyIcon type="primary" className={styles.icon} />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
        {isModalOpen && (
          <Modal title={null} onClose={closeModal}>
            <OrderDetails/>
          </Modal>
        )}
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  burger: PropTypes.shape(ingredientsPropTypes).isRequired,
};
export default memo(BurgerConstructor);
