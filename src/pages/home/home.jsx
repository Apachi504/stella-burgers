import {HTML5Backend} from "react-dnd-html5-backend";
import styles from "../../components/app/app.module.scss";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import {DndProvider} from "react-dnd";

export function Home({openModal}) {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.container}>
                    <BurgerIngredients openModal={openModal}/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </>
    );
}