import {useEffect, useState} from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients, getIngredients} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import Loader from "../loader/loader.jsx";
import {useModal} from "../../hooks/use-modal.js";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.jsx";
import Modal from "../modal/modal.jsx";
import {getIngredientDetails} from "../../services/ingredient-details/ingredient-details-slice.js";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home/home.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";
import {IngredientPage} from "../../pages/ingredients-page/ingredients-page.jsx";



function App() {
    const {isModalOpen, openModal, closeModal} = useModal();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {burgerIngredientsLoading, burgerIngredientsError} = useSelector((state) => state.burgerIngredients);
    const backgroundLocation = location.state?.backgroundLocation;

    useEffect(() => {
            dispatch(getIngredients());
    }, []);
    function onCloseModal() {
        navigate(backgroundLocation.pathname, {replace: true});
    }
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
                <Routes location={backgroundLocation || location}>
                    <Route path='/' element={<Home openModal={openModal} />} />
                    <Route path='ingredients/:id' element={<IngredientPage/>} />
                    </Routes>
                {backgroundLocation &&
                    <Routes>
                        {location.state?.ingredient &&
                            <Route path='ingredients/:id' element={
                                <Modal title={'Детали ингредиента'} onClose={onCloseModal}>
                                    <IngredientDetails ingredient={location.state?.ingredient}/>
                                </Modal>}>
                            </Route>}
                    </Routes>
                }
            </div>
        </>
    )
}

export default App;
