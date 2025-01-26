import {useEffect, useState} from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import Loader from "../loader/loader.jsx";
import {useModal} from "../../hooks/use-modal.js";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.jsx";
import Modal from "../modal/modal.jsx";
import {getIngredientDetails} from "../../services/ingredient-details/ingredient-details-slice.js";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/home/home.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";



function App() {
    const {isModalOpen, openModal, closeModal} = useModal();
    const ingredientDetails = useSelector(getIngredientDetails);

    const dispatch = useDispatch();
    const {burgerIngredientsLoading, burgerIngredientsError} = useSelector((state) => state.burgerIngredients);
    useEffect(() => {
            dispatch(getIngredients());
    }, []);

    {
        if (burgerIngredientsLoading) {
            return <Loader />;
        }
    }
    if (burgerIngredientsError) {
        return <div>Error: {burgerIngredientsError}</div>;
    }

    return (

        <>
        <AppHeader/>
            <div>
                <Routes>
                    <Route path="/" element={<Home openModal={openModal}/>} />
                    <Route path="/profile/login" element={<Login />} />
                    <Route path="/profile/login/register" element={<Register />} />
                    <Route path="/profile/login/forgot-password-1" element={<ForgotPassword />} />
                    <Route path="/profile/login/forgot-password-2" element={<ResetPassword />} />
                </Routes>
            </div>
            {isModalOpen &&
                <Modal onClose={closeModal} title={"Детали ингредиента"}>
                    <IngredientDetails {...ingredientDetails}/>
                </Modal>
            }
        </>
    );
}

export default App;
