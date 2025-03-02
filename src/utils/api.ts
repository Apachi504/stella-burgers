import {checkResponse} from "./getResponse";
import {BASE_URL} from "./constant.js";
import {TIngredient, TOrder} from "./prop-types";

// type TServerResponse<T> = {
//     success: boolean;
// } & T;
type TResponse = {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
};
type TServerResponse<T> = {
    success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

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
type TIngredients ={
    success: boolean;
    data:TIngredient[];
};
export const getBurgerIngredients = () =>
    fetch(`${BASE_URL}/ingredients`)
        .then((res) => checkResponse<TIngredients>(res))
        .then((data) => {
            if (data?.success) return data.data;
            return Promise.reject(data);
        });
type TOrderResponse = TServerResponse<{
    name: string;
    order: TOrder;
}>;

export const getOrderApi = async (order: string[]) => {
    const data = await fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
        } as HeadersInit,
        body: JSON.stringify({ingredients: order}),
    });
    if (data?.success) return data;
    return Promise.reject(data);
}
type TRegisterUser = {
    email:string,
    password?:string,
    name?:string
}
type TAuthUserResponse = TServerResponse<{
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
    };
}>;

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
    }).then((res) => checkResponse<TAuthUserResponse>(res))
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
    }).then((res) => checkResponse<TRefreshResponse>(res))
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
    }).then((res) => checkResponse<TRefreshResponse>(res))
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
    }).then((res) => checkResponse<TAuthUserResponse>(res))
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
