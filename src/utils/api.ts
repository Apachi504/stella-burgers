import {checkResponse} from "./getResponse";
import {BASE_URL} from "./constant.js";
import {TIngredient} from "./prop-types";

type TResponse = {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
};

export async function fetchWithRefresh(url:RequestInfo, options:RequestInit): Promise<TResponse> {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if ((err as {message: string}).message !== 'jwt expired') {
            const refreshRes = await fetch(`${BASE_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken'),
                }),
            });
            const refreshData = await refreshRes.json();
            if (!refreshData.success) return Promise.reject(refreshData);
            localStorage.setItem('accessToken', refreshData.accessToken);
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            (options.headers as{[key: string]: string}).authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse<TResponse>(res);
        }
        return Promise.reject(err);
    }
}

export const getBurgerIngredients = () =>
    fetch(`${BASE_URL}/ingredients`)
        .then((res) => checkResponse<TIngredient>(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        });

export const postDataIngredients = async (order:string[]) => {
    return await fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
        } as HeadersInit,
        body: JSON.stringify({ingredients: order}),
    });
}
type TRegisterUser = {
    email:string,
    password?:string,
    name?:string
}
export const registerUserApi = ({email, password, name} : TRegisterUser) =>
    fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
    }).then((res) => checkResponse<TResponse>(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        });

export const forgotPasswordApi = ({email}:TRegisterUser) =>
    fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email
        }),
    }).then((res) => checkResponse<TResponse>(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        })

type TResetPassword = {
    password: string,
    token: string
}
export const resetPasswordApi = ({password, token}: TResetPassword) =>
    fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            password: password,
            token: token
        }),
    }).then((res) => checkResponse<TResponse>(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        })
export const loginUserApi = ({email, password}: TRegisterUser) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }).then((res) => checkResponse<TResponse>(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        })
export const logoutUserApi = () =>
    fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    }).then((res) => checkResponse(res));

export const getUserApi = () =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        headers: {
            authorization: localStorage.getItem('accessToken')
        } as HeadersInit,
    });

export const refactoringUserApi = ({email, password, name}: TRegisterUser) =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: localStorage.getItem('accessToken')
        } as HeadersInit,
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
    })
