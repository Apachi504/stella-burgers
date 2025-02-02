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


function App() {
    const {isModalOpen, openModal, closeModal} = useModal();
    const ingredientDetails = useSelector(getIngredientDetails);

    const dispatch = useDispatch();
    const {burgerIngredientsLoading, burgerIngredientsError} = useSelector((state) => state.burgerIngredients);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
            dispatch(getIngredients());
    }, []);
    useEffect(() => {
        setLoading(!burgerIngredientsLoading);
        return () => {
            setTimeout(() => {
                setLoading(burgerIngredientsLoading);
            },2000)
        }
    }, [setLoading]);
    {
        if (loading) {
            return <Loader/>;
        }
    }
    if (burgerIngredientsError) {
        return <div>Error: {burgerIngredientsError}</div>;
    }

    return (

        <>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
            <main className={styles.container}>
                <BurgerIngredients openModal={openModal}/>
                <BurgerConstructor/>
            </main>
            </DndProvider>
            {isModalOpen &&
                <Modal onClose={closeModal} title={"Детали ингредиента"}>
                    <IngredientDetails {...ingredientDetails}/>
                </Modal>
            }
        </>
    );
}

export default App;
