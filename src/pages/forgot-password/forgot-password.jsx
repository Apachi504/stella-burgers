import React, {useRef, useState} from "react";
import styles from "../login/login.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const inputRef = useRef(null);
    const onClick = () => navigate('/profile/login/forgot-password-2');
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>
                    Восстановление пароля
                </p>
                <Input
                    type={'email'}
                    placeholder={'Укажите E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
                    Восстановить
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
    );
}
export default ForgotPassword;
