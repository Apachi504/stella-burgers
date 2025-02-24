import React, {FC, FormEvent, SyntheticEvent, useRef, useState} from "react";
import styles from "../login/login.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPasswordApi} from "../../utils/api.js";

export const ForgotPassword: FC =()=> {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState<Error|null>(null);

    const onClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        forgotPasswordApi({email})
            .then(() =>{
              localStorage.setItem('resetPassword','true');
              navigate('/reset-password', {replace: true});
            })
            .catch((err) => setError(err));
    };
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>
                    Восстановление пароля
                </p>
                <form
                    className={styles.form}
                    onSubmit={onClick}
                >
                <Input
                    type={'email'}
                    placeholder={'Укажите E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'name'}
                    error={false}
                    errorText=''
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Восстановить
                </Button>
                    {error?.message && (
                        <p className={styles.error}>{error?.message}</p>
                    )}
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
    );
}
