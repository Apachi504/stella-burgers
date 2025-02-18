import { useNavigate } from "react-router-dom";
import styles from "./not-found.module.scss";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.text}>404</h1>
            <p className={styles.text}>Страница не найдена</p>
        </div>
    );
};

export default PageNotFound;