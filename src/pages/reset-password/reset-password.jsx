import React, {useEffect, useRef, useState} from "react";
import styles from "../login/login.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPasswordApi} from "../../utils/api.js";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        resetPasswordApi({password, token})
            .then(() =>{
                localStorage.removeItem('resetPassword');
                    navigate('/login');
                }).catch((err) => console.log(err));
    }
    useEffect(() => {
        if (!localStorage.getItem('resetPassword')) {
            navigate('/forgot-password', { replace: true });
        }
    }, [navigate]);
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>
                    Восстановление пароля
                </p>
                <form
                    className={styles.form}
                    onSubmit={onSubmit}
                >
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20" >
                    Сохранить
                </Button>
                </form>
                <div className={styles.registration}>
                    <div className={styles.line}>
                        <p className={styles.text}>Вспомнили пароль?</p>
                        <Link to="/login" className={styles.link}>
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;