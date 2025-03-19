import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";
import {NavLink} from "react-router-dom";
import React, {FC} from "react";
import {useSelector} from "../../services/store";
import {getUserSelector} from "../../services/user/user-slice";

type TUser = {
    user: {
        name: string | null
    }
}

export const AppHeader: FC = ()=> {
    const user: TUser = useSelector(getUserSelector);
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <div className={styles.navbar__left}>
                        <ul className={styles.navbar__list}>
                            <NavLink to='/'>
                                {({isActive}) => (isActive ?
                                        <li className={styles.navbar__items}>
                                            <BurgerIcon type="primary"/>
                                            <p className={`${styles.navbar__link} ${styles.active} ml-2`}> Конструктор</p>
                                        </li>
                                        :
                                        <li className={styles.navbar__items}>
                                            <BurgerIcon type="secondary"/>
                                            <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}> Конструктор</p>
                                        </li>
                                )}
                            </NavLink>
                            <NavLink to='/feed'>
                                {({isActive}) => (isActive ?
                                        <li className={styles.navbar__items}>
                                            <ListIcon type="primary"/>
                                            <p className={`${styles.navbar__link} ${styles.active} ml-2`}>Лента
                                                заказов</p>
                                        </li>
                                        :
                                        <li className={styles.navbar__items}>
                                            <ListIcon type="secondary"/>
                                            <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}>Лента
                                                заказов</p>
                                        </li>
                                )}
                            </NavLink>
                        </ul>
                    </div>
                    <div className={styles.navbar__center}>
                        <NavLink to='/' className={styles.navbar__link}>
                            <Logo/>
                        </NavLink>
                    </div>
                    <div className={styles.navbar__right}>
                        <NavLink to='/profile'>
                            {({isActive}) => (isActive ?
                                    <li className={styles.navbar__items}>
                                        <ProfileIcon type="primary"/>
                                        <p className={`${styles.navbar__link} ${styles.active} ml-2`}>{user?.user ? user?.user.name : 'Личный кабинет'}</p>
                                    </li>
                                    :
                                    <li className={styles.navbar__items}>
                                        <ProfileIcon type="secondary"/>
                                        <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}>{user?.user ? user?.user.name : 'Личный кабинет'}</p>
                                    </li>
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
  