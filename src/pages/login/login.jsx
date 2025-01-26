import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import styles from './login.module.scss'
import {NavLink} from "react-router-dom";
function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);

    return (
        <>
            <div className={styles.container}>
            <p className={styles.title}>
                Вход
            </p>
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
            <Button htmlType="button" type="primary" size="medium" style={{width: '128px', height: '56px'}} extraClass="mb-20">
                Войти
            </Button>
                <div className={styles.registration}>
                    <div className={styles.line}>
                    <p className={styles.text}>Вы — новый пользователь?</p>
                        <NavLink to="/profile/login/register" className={`${styles.link} mb-4`}>
                            Зарегистрироваться
                        </NavLink>
                    </div>
                    <div className={styles.line}>
                    <p className={styles.text}>Забыли пароль?</p>
                        <NavLink to="/profile/login/forgot-password-1" className={styles.link}>
                            Восстановить пароль
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login