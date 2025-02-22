import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../../components/app/app.module.scss";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.js";
import {DndProvider} from "react-dnd";
import {FC} from "react";

export const Home: FC = () => {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.container}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </>
    );
}