import React, {useRef, useState} from "react";
import styles from "../login/login.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>
                    Восстановление пароля
                </p>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
                    Сохранить
                </Button>
                <div className={styles.registration}>
                    <div className={styles.line}>
                        <p className={styles.text}>Вспомнили пароль?</p>
                        <NavLink to="/profile/login" className={styles.link}>
                            Войти
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;