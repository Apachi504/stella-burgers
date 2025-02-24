import React, { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getBurgerIngredientsError,
    getBurgerIngredientsLoading,
    getIngredients
} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import Loader from "../loader/loader.js";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.js";
import Modal from "../modal/modal.js";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home/home.js";
import Login from "../../pages/login/login.js";
import Register from "../../pages/register/register.js";
import {IngredientPage} from "../../pages/ingredients-page/ingredients-page.js";
import PageNotFound from "../../pages/not-found/not-found.js";
import ProfileEdit from "../../pages/profile-edit/profile-edit.js";
import ProfileOrders from "../../pages/profile-order/profile-order.js";
import {OnlyAuth, OnlyUnAuth} from "../protected-router/protected-route.js";
import {checkAuthUser} from "../../services/user/user-slice.js";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import {AppHeader} from "../app-header/app-header";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const burgerIngredientsLoading = useSelector(getBurgerIngredientsLoading);
    const burgerIngredientsError = useSelector(getBurgerIngredientsError);
    const background = location.state && location.state?.backgroundLocation;

    useEffect(() => {
        // @ts-ignore
        dispatch(getIngredients());
        // @ts-ignore
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
        // @ts-ignore
        return <div>Error: {burgerIngredientsError}</div>;
    }
    return (

        <>
            <AppHeader/>
            <div>
                <Routes location={background || location}>
                    <Route path='/' element={<Home/>}/>
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
