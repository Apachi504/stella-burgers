import React, {FormEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-edit.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUserSelector, refactoringUser} from "../../services/user/user-slice.js";
import Loader from "../../components/loader/loader";

function ProfileEdit() {
    // @ts-ignore
    const {user} = useSelector(getUserSelector);
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        name:user?.name || '',
        email:user?.email || '',
        password: ''
    });
    const [updateUserError, setUpdateUserError] = useState<string|undefined>(
        undefined
    );
    useEffect(() => {
        // @ts-ignore
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormValue({
                name: user.name || '',
                email: user.email || '',
                password: user.password || ''
            });
        }
    }, [user]);

    const isFormChanged =
        formValue.name !== user?.name ||
        formValue.email !== user?.email ||
        !!formValue.password;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormChanged) {
            // @ts-ignore
            dispatch(refactoringUser({
                name: formValue.name,
                email: formValue.email,
                password: formValue.password,
                accessToken
            }))
                .unwrap()
                .then(() => {
                    setFormValue({...formValue, password: ''});
                    setUpdateUserError(undefined);
                })
                .catch((err: any) => setUpdateUserError(err.message));
        }
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();
        setFormValue({
            name: user?.name || '',
            email: user?.email || '',
            password: user?.password || ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    if (!user) {
        return <Loader/>
    }
    return (
        <>
            <main>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleInputChange}
                            value={formValue.name}
                            name={'name'}
                            error={false}
                            errorText={''}
                            size={'default'}
                            icon={'EditIcon'}
                            extraClass="ml-1 mb-6"
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={handleInputChange}
                            value={formValue.email}
                            name={'email'}
                            error={false}
                            errorText={''}
                            size={'default'}
                            icon={'EditIcon'}
                            extraClass="ml-1 mb-6"
                        />
                        <PasswordInput
                            onChange={handleInputChange}
                            value={formValue.password}
                            name={'password'}
                            placeholder={'Пароль'}
                            extraClass="mb-6"
                            icon={'EditIcon'}
                        />
                    </div>
                    {isFormChanged && (
                        <>
                            <div className={styles.button}>
                                <Button
                                    type='secondary'
                                    htmlType='button'
                                    size='medium'
                                    onClick={handleCancel}
                                >
                                    Отменить
                                </Button>
                                <Button type='primary' size='medium' htmlType='submit'>
                                    Сохранить
                                </Button>
                            </div>
                        </>)}
                </form>
            </main>
        </>
    );
}

export default ProfileEdit;