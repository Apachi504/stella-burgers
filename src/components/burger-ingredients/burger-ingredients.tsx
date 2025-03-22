import React, {FC, memo, useEffect} from "react";
import styles from "./burger-ingredients.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/ingredient-group";
import {useInView} from "react-intersection-observer";

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = React.useState("buns");
    const [refBuns, inViewBuns] = useInView({threshold: 0.5});
    const [refSauces, inViewSauces] = useInView({threshold: 0.5});
    const [refMain, inViewMain] = useInView({threshold: 0.5});
    useEffect(() => {
        if (inViewBuns) {
            setCurrent("buns");
        } else if (inViewMain) {
            setCurrent("main");
        } else if (inViewSauces) {
            setCurrent("sauces");
        }
    }, [inViewBuns, inViewSauces, inViewMain]);
    const scrollIntoView = (id:string) => {
        setCurrent(id);
        const element: HTMLElement | null = document.getElementById(id);
        element?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <section>
            <div className={styles.content}>
                <h2 className={styles.title}>Соберите бургер</h2>
                <div className={styles.tabs}>
                    <Tab
                        value="buns"
                        active={current === "buns"}
                        onClick={scrollIntoView}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value="main"
                        active={current === "main"}
                        onClick={scrollIntoView}
                    >
                        Начинки
                    </Tab>
                    <Tab
                        value="sauces"
                        active={current === "sauces"}
                        onClick={scrollIntoView}
                    >
                        Соусы
                    </Tab>
                </div>
                <div className={`${styles.container} custom-scroll`}>
                    <IngredientGroup
                        title={"Булки"}
                        type={"bun"}
                        id={"buns"}
                        ref={refBuns}

                    />

                    <IngredientGroup
                        title={"Начинки"}
                        type={"main"}
                        id={"main"}
                        ref={refMain}
                    />
                    <IngredientGroup
                        title={"Соусы"}
                        type={"sauce"}
                        id={"sauces"}
                        ref={refSauces}
                    />
                </div>
            </div>
        </section>

    );
};

export default memo(BurgerIngredients);
