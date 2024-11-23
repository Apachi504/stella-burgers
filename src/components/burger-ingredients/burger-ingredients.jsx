import React, {memo, useEffect} from 'react'
import styles from './burger-ingredients.module.scss'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientGroup from './ingredient-group/ingredient-group.jsx'
import PropTypes from 'prop-types';
const BurgerIngredients = ({burger}) => {
    const [current, setCurrent] = React.useState('buns');
    const scrollIntoView = (id) => {
        setCurrent(id);
        document.getElementById(id).scrollIntoView({behavior: "smooth"});
    };

    return (
        <section>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    Соберите бургер
                </h2>
                <div className={styles.tabs}>
                    <Tab value="buns" active={current === 'buns'} onClick={scrollIntoView}>
                        Булки
                    </Tab>
                    <Tab value="sauces" active={current === 'sauces'} onClick={scrollIntoView}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={scrollIntoView}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.container}>
                    <IngredientGroup burger={burger} title={"Булки"} type={'bun'} id={'buns'}/>
                    <IngredientGroup burger={burger} title={"Соусы"} type={'sauce'} id={'sauces'}/>
                    <IngredientGroup burger={burger} title={"Начинки"} type={'main'} id={'main'}/>
                </div>
            </div>
            
        </section>
    )
};

BurgerIngredients.propTypes = {
    burger: PropTypes.object.isRequired,
};
export default memo(BurgerIngredients);
