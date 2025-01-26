import {Logo,BurgerIcon,ListIcon,ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
// function NavLinkWithIcon({ to, icon, label }) {
//   const [isActive,setIsActive] = useState(false);
//   const iconType = isActive ? "primary" : "secondary";
//   const linkClass = isActive ? styles.active : styles.inactive;
//
//   return (
//       <NavLink to={to} >
//         <li className={styles.navbar__items} onClick={()=> setIsActive(!isActive)}>
//           {React.createElement(icon, { type: iconType })}
//           <p className={`${styles.navbar__link} ${linkClass} ml-2`}>{label}</p>
//         </li>
//       </NavLink>
//   );
// }
// <NavLinkWithIcon to="/" icon={BurgerIcon} label="Конструктор" isActive={true} />
  function AppHeader() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navbar}>
            <div className={styles.navbar__left}>
              <ul className={styles.navbar__list}>
                <NavLink to='/'>
                    {({ isActive }) => (isActive ?
                            <li className={styles.navbar__items}>
                              <BurgerIcon type="primary" />
                              <p className={`${styles.navbar__link} ${styles.active} ml-2`}> Конструктор</p>
                            </li>
                            :
                            <li className={styles.navbar__items}>
                              <BurgerIcon type="secondary" />
                              <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}> Конструктор</p>
                            </li>
                    )}
                  </NavLink>
                <NavLink to='/feed'>
                  {({ isActive }) => (isActive ?
                          <li className={styles.navbar__items}>
                            <ListIcon type="primary" />
                            <p className={`${styles.navbar__link} ${styles.active} ml-2`}>Лист заказов</p>
                          </li>
                          :
                          <li className={styles.navbar__items}>
                            <ListIcon type="secondary" />
                            <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}>Лист заказов</p>
                          </li>
                  )}
                </NavLink>
              </ul>
            </div>
            <div className={styles.navbar__center}>
              <Logo />
            </div>
            <div className={styles.navbar__right}>
              <NavLink to='/profile/login' >
                {({ isActive }) => (isActive ?
                        <li className={styles.navbar__items}>
                          <ProfileIcon type="primary" />
                          <p className={`${styles.navbar__link} ${styles.active} ml-2`}>Личный кабинет</p>
                        </li>
                        :
                        <li className={styles.navbar__items}>
                          <ProfileIcon type="secondary" />
                          <p className={`${styles.navbar__link} ${styles.inactive} ml-2`}>Личный кабинет</p>
                        </li>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default AppHeader;
  