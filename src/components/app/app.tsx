import React, { useEffect} from "react";
import {useDispatch, useSelector} from "../../services/store";
import {
    getBurgerIngredientsError,
    getBurgerIngredientsLoading,
    getIngredients
} from "../../services/burger-ingredients/burger-ingredients-slice.js";
import Loader from "../loader/loader.js";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details.js";
import Modal from "../modal/modal.js";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Home} from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import {IngredientPage} from "../../pages/ingredients-page/ingredients-page";
import PageNotFound from "../../pages/not-found/not-found";
import ProfileEdit from "../../pages/profile-edit/profile-edit";
import ProfileOrders from "../../pages/profile-order/profile-order";
import {OnlyAuth, OnlyUnAuth} from "../protected-router/protected-route";
import {checkAuthUser} from "../../services/user/user-slice";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import {AppHeader} from "../app-header/app-header";
import {Feed} from "../../pages/feed/feed";
import {OrderInfo} from "../feed-orders/order-info/order-info";
import {FeedPage} from "../../pages/feed-page/feed-page";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const burgerIngredientsLoading = useSelector(getBurgerIngredientsLoading);
    const burgerIngredientsError = useSelector(getBurgerIngredientsError);
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
        // @ts-ignore
        return <div>Error: {burgerIngredientsError}</div>;
    }
    return (

        <>
            <AppHeader/>
            <div>
                <Routes location={background || location}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='feed' element={<Feed/>}/>
                    <Route path='feed/:number' element={<FeedPage/>}/>
                    <Route path='ingredients/:id' element={<IngredientPage/>}/>
                    <Route path='/*' element={<PageNotFound/>}/>
                    <Route path='profile' element={
                        <OnlyAuth component={<Profile/>}/>}>
                        <Route index element={<ProfileEdit/>}/>
                        <Route path='orders' element={<ProfileOrders/>}/>
                    </Route>
                    <Route path='profile/orders/:number' element={
                        <OnlyAuth component={<FeedPage/>}/>}/>
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
                        { location.state?.orderNumber &&
                            <Route path='feed/:number' element={
                                <Modal title={`#${location.state?.orderNumber.number}`} onClose={onCloseModal}>
                                    <OrderInfo order={location.state?.orderNumber}/>
                                </Modal>}>
                            </Route>
                        }
                        { location.state?.orderNumber &&
                            <Route path='profile/orders/:number' element={
                                <Modal title={`#${location.state?.orderNumber.number}`} onClose={onCloseModal}>
                                    <OrderInfo order={location.state?.orderNumber}/>
                                </Modal>}>
                            </Route>
                        }
                    </Routes>
                }
            </div>
        </>
    )
}

export default App;
