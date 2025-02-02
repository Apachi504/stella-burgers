import React, {memo, useEffect} from "react";
import styles from "./burger-ingredients.module.scss";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientGroup from "./ingredient-group/ingredient-group.jsx";
import PropTypes from "prop-types";
import {ingredientsPropTypes} from "../../utils/prop-types.js";
import {useInView} from "react-intersection-observer";

const BurgerIngredients = ({openModal}) => {
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
    const scrollIntoView = (id) => {
        setCurrent(id);
        document.getElementById(id).scrollIntoView({behavior: "smooth"});
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
                        openModal={openModal}
                    />

                    <IngredientGroup
                        title={"Начинки"}
                        type={"main"}
                        id={"main"}
                        ref={refMain}
                        openModal={openModal}
                    />
                    <IngredientGroup
                    title={"Соусы"}
                    type={"sauce"}
                    id={"sauces"}
                    ref={refSauces}
                    openModal={openModal}
                    />
                </div>
            </div>
        </section>

    );
};

BurgerIngredients.propTypes = {
    burger: ingredientsPropTypes,
    openModal: PropTypes.func
};
export default memo(BurgerIngredients);
