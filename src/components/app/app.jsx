import React, {useEffect, useState} from "react";
import AppHeader from "../app-header/app-header.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients, getIngredients} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import Loader from "../loader/loader.jsx";
import {useModal} from "../../hooks/use-modal.js";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.jsx";
import Modal from "../modal/modal.jsx";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home/home.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import {IngredientPage} from "../../pages/ingredients-page/ingredients-page.jsx";
import PageNotFound from "../../pages/not-found/not-found.jsx";
import ProfileEdit from "../../pages/profile-edit/profile-edit.jsx";
import ProfileOrders from "../../pages/profile-order/profile-order.jsx";
import {OnlyAuth, OnlyUnAuth, ProtectedRoute} from "../protected-router/protected-route.jsx";
import {checkAuthUser, getIsAuthCheckedSelector, getUser} from "../../services/user/user-slice.js";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";
import Profile from "../../pages/profile/profile.jsx";

function App() {
    const {isModalOpen, openModal, closeModal} = useModal();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {burgerIngredientsLoading, burgerIngredientsError} = useSelector((state) => state.burgerIngredients);
    const background = location.state && location.state?.backgroundLocation;

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(checkAuthUser());
    }, []);


    function onCloseModal() {
        navigate(-1);
    }

    {
        if (burgerIngredientsLoading) {
            return <Loader/>;
        }
    }
    if (burgerIngredientsError) {
        return <div>Error: {burgerIngredientsError}</div>;
    }
    return (

        <>
            <AppHeader/>
            <div>
                <Routes location={background || location}>
                    <Route path='/' element={<Home openModal={openModal}/>}/>
                    <Route path='ingredients/:id' element={<IngredientPage/>}/>
                    <Route path='/*' element={<PageNotFound/>}/>
                    <Route path='profile' element={
                        <OnlyAuth component={<Profile/>}/>}>
                        <Route index element={<ProfileEdit/>}/>
                        <Route path='orders' element={<ProfileOrders/>}/>
                    </Route>
                    <Route path='login' element={
                        <OnlyUnAuth component={<Login/>}/>
                    }/>
                    <Route path='register' element={
                        <OnlyUnAuth component={<Register/>}/>
                    }/>
                    <Route path='forgot-password' element={
                        <OnlyUnAuth component={<ForgotPassword/>}/>
                    }/>
                    <Route path='reset-password' element={
                        <OnlyUnAuth component={<ResetPassword/>}/>
                    }/>
                </Routes>
                {background &&
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
