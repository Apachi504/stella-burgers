import styles from "../login/login.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {registrationUser} from "../../services/auth/register/register-slice.js";

function Register (){
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const onClick = () =>{
        dispatch(registrationUser({email, password, name}))
    }
    return(
        <>
            <div className={styles.container}>
                <p className={styles.title}>
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
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
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" size="large" extraClass='mb-20' onClick={onClick}>
                    Зарегистрироваться
                </Button>
                <div className={styles.registration}>
                    <div className={styles.line}>
                        <p className={styles.text}>Уже зарегистрированы?</p>
                        <NavLink to="/profile/login" className={styles.link}>
                            Войти
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;