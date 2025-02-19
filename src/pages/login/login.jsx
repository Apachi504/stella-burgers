import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import styles from './login.module.scss'
import {Link,useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getUser, loginUser} from "../../services/user/user-slice.js";
function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}))
            .then((data) =>
            {
              const from = location.state?.from?.pathname || '/profile';
              navigate(from, {replace: true});
            })
            .catch((err) => console.log(err));
    }
    return (
        <>
            <div className={styles.container}>
            <p className={styles.title}>
                Вход
            </p>
                <form
                onSubmit={handleSubmit}
                className={styles.form}
                >
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
                name={'name'}
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={e =>  setPassword(e.target.value)}
                value={password}
                name={'password'}
                extraClass="mb-6"
            />
            <Button htmlType="submit" type="primary" size="medium" style={{width: '128px', height: '56px'}} extraClass="mb-20">
                Войти
            </Button>
                </form>
                <div className={styles.registration}>
                    <div className={styles.line}>
                    <p className={styles.text}>Вы — новый пользователь?</p>
                        <Link to="/register" className={`${styles.link} mb-4`}>
                            Зарегистрироваться
                        </Link>
                    </div>
                    <div className={styles.line}>
                    <p className={styles.text}>Забыли пароль?</p>
                        <Link to="/forgot-password" className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login