import {Logo,BurgerIcon,ListIcon,ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";
  
  function AppHeader() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navbar}>
            <div className={styles.navbar__left}>
              <ul className={styles.navbar__list}>
                <li className={`${styles.navbar__items} mr-2`}>
                  <BurgerIcon type="primary" />
                  <a href="/" className={`${styles.navbar__link} ${styles.active} `}>
                    Конструктор
                  </a>
                </li>
                <li className={styles.navbar__items}>
                  <ListIcon type="secondary" />
                  <a href="/" className={`${styles.navbar__link} ${styles.inactive}`}>
                    Лента заказов
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.navbar__center}>
              <Logo />
            </div>
            <div className={styles.navbar__right}>
              <li className={styles.navbar__items}>
                <ProfileIcon type="secondary" />
                <a href="/" className={`${styles.navbar__link} ${styles.inactive}`}>
                  Личный кабинет
                </a>
              </li>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default AppHeader;
  