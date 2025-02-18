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
import {getOrderError, getOrderLoading, getOrderNumber, getOrders} from "../../services/order/order-slice.js";
import {totalPriceSelector} from "../../services/selectors.js";
import {getIsAuthCheckedSelector, getUserSelector, isAuthorizedSelector} from "../../services/user/user-slice.js";
import {useLocation, useNavigate} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

const BurgerConstructor = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();
    const burger = useSelector((state) => state.burgerConstructor)||{bun: null, ingredients: []};
    const totalPrice = useSelector(totalPriceSelector);
    const isAuth = useSelector(isAuthorizedSelector);
    const navigate = useNavigate();
    const orderNumber = useSelector(getOrderNumber);
    const isLoading = useSelector(getOrderLoading);
    const location = useLocation();
    const onCreateOrder = () => {
            if (burger.bun && burger.ingredients.length > 0) {
                if(isAuth){
                dispatch(
                    getOrders({ ingredients: burger.ingredients, bun: burger.bun }),
                )
            }else {
                    navigate('/login' , { state: {from: location}});
                }
        }
        openModal();
    }
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
    const boxShadowBun =
        isHoveredTop || isHoveredBottom
            ? "0px 0px 10px  2px #646cff"
            : "none";
    const boxShadowStuffing =
        isHoveredCenter
            ? "0px 0px 10px  2px #646cef"
            : "none";

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
                            style={{boxShadow: boxShadowBun}}
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
                            style={{ boxShadow: boxShadowStuffing }}
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
                            style={{ boxShadow: boxShadowBun }}
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
                    onClick={onCreateOrder}
                >
                    Оформить заказ
                </Button>

            </div>
            {   isLoading ?(
                    <Modal title={'Офоромление заказа'} onClose={closeModal}>
                        <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            color="#fff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{height: '50vh',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        />
                    </Modal>
                ):(
                        isModalOpen && (
                            <Modal title={null} onClose={closeModal}>
                                <OrderDetails orderNumber={orderNumber}/>
                            </Modal>
                        )
                    )
            }
        </div>
    );
};
export default memo(BurgerConstructor);