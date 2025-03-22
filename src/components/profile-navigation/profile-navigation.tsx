import {NavLink, useLocation, useNavigate} from "react-router-dom";
import styles from "./profile-navigation.module.scss";
import {logoutUser} from "../../services/user/user-slice";
import {useDispatch} from "../../services/store";
import React from "react";

function ProfileNavigation() {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickHandel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logoutUser())
            .then(() => navigate('/login'))
            .catch((err: string)=>console.log(err));
    }
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <NavLink to='/profile'
                         className={({isActive}) => `${styles.link} ${isActive ? styles.active : styles.inactive}`} end>
                    Профиль
                </NavLink>
                <NavLink to='/profile/orders'
                         className={({isActive}) => `${styles.link} ${isActive ? styles.active : styles.inactive}`}>
                    История заказов
                </NavLink>
                <button onClick={onClickHandel} className={`${styles.link} ${styles.inactive} ${styles.logout}`}>
                    Выход
                </button>
            </ul>
            {
                (pathname === '/profile') ?
                    <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
                    :
                    <p className={styles.description}>В этом разделе вы можете посмотреть свою историю заказов</p>
            }
        </nav>
    );
}

export default ProfileNavigation