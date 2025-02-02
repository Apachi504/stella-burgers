import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DragIcon,
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import OrderDetails from "./order-details/order-details.jsx";
import { useModal } from "../../hooks/use-modal";
import Modal from "../modal/modal.jsx";
import { ingredientsPropTypes } from "../../utils/prop-types.js";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
    addBun,
    addIngredient,
    removeIngredient,
    resetConstructor,
} from "../../services/burger-constructor/burger-constructor-slice.js";
import { DraggableWrapper } from "./draggable-wrapper/draggable-wrapper.jsx";
import { getOrders } from "../../services/order/order-slice.js";

const BurgerConstructor = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const burger = useSelector((state) => state.burgerConstructor);
    const openModalOrder = () => {
        if (burger.bun && burger.ingredients.length > 0) {
            dispatch(
                getOrders({ ingredients: burger.ingredients, bun: burger.bun }),
            ).then(() => dispatch(resetConstructor()));
        }
        openModal();
    };
    const [{ isHoveredTop }, topRef] = useDrop({
        accept: "bun",
        collect(monitor) {
            return {
                isHoveredTop: monitor.isOver(),
            };
        },
        drop(item) {
            dispatch(addBun(item));
        },
    });
    const [{ isHoveredBottom }, bottomRef] = useDrop({
        accept: "bun",
        collect(monitor) {
            return {
                isHoveredBottom: monitor.isOver(),
            };
        },
        drop(item) {
            dispatch(addBun(item));
        },
    });
    const [{ isHoveredCenter }, centerRef] = useDrop({
        accept: "stuffing",
        collect(monitor) {
            return {
                isHoveredCenter: monitor.isOver(),
            };
        },
        drop(item) {
            dispatch(addIngredient(item));
        },
    });
    const boxShadow =
        isHoveredTop || isHoveredBottom
            ? "0px 0px 10px  2px #646cff"
            : isHoveredCenter
                ? "0px 0px 10px  2px #646cef"
                : "none";

    const totalPrice = useMemo(() => {
        return burger.bun
            ? burger.bun.price * 2 +
            burger.ingredients.reduce((acc, el) => acc + el.price, 0)
            : 0;
    }, [burger]);

    return (
        <div className={styles.container}>
            <ul>
                <li ref={topRef}>
                    {burger.bun ? (
                        <ConstructorElement
                            type="top"
                            extraClass={"ml-8"}
                            isLocked={true}
                            text={`${burger.bun.name} (верх)`}
                            price={burger.bun.price}
                            thumbnail={burger.bun.image}
                        />
                    ) : (
                        <p
                            className={`${styles.wrapper} ${styles.top}`}
                            style={{boxShadow: boxShadow}}
                        >
                            Выберите булку
                        </p>
                    )}
                </li>
                <li ref={centerRef}>
                    {burger.ingredients.length ? (
                        <span className={styles.content}>
              <ul className={styles.group}>
                {burger.ingredients.map((el, index) => {
                    return (
                        <DraggableWrapper key={el.id} index={index} id={el._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                style={{ width: "100%" }}
                                key={index}
                                type="main"
                                text={el.name}
                                price={el.price}
                                thumbnail={el.image}
                                handleClose={() => dispatch(removeIngredient(el.id))}
                            />
                        </DraggableWrapper>
                    );
                })}
              </ul>
            </span>
                    ) : (
                        <p
                            className={`${styles.wrapper} ${styles.center}`}
                            style={{ boxShadow: boxShadow }}
                        >
                            Выберите ингредиенты
                        </p>
                    )}
                </li>
                <li ref={bottomRef}>
                    {burger.bun ? (
                        <ConstructorElement
                            type="bottom"
                            extraClass={" ml-8"}
                            isLocked={true}
                            text={`${burger.bun.name} (низ)`}
                            price={burger.bun.price}
                            thumbnail={burger.bun.image}
                        />
                    ) : (
                        <p
                            className={`${styles.wrapper} ${styles.bottom}`}
                            style={{ boxShadow: boxShadow }}
                        >
                            Выберите булку
                        </p>
                    )}
                </li>
            </ul>
            <div className={styles.submit}>
                <div className={styles.total}>
                    <p className={styles.total__price}>{totalPrice}</p>
                    <CurrencyIcon type="primary" className={styles.icon} />
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={openModalOrder}
                >
                    Оформить заказ
                </Button>
                {isModalOpen && (
                    <Modal title={null} onClose={closeModal}>
                        <OrderDetails />
                    </Modal>
                )}
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    burger: ingredientsPropTypes,
};
export default memo(BurgerConstructor);
