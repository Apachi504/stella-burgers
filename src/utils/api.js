import {checkResponse} from "./getResponse.js";
import {BASE_URL} from "./constant.js";

export async function fetchWithRefresh(url, options) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message !== 'jwt expired') {
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
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        }
        return Promise.reject(err);
    }
}

export const getBurgerIngredients = () =>
    fetch(`${BASE_URL}/ingredients`)
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        });
export const postDataIngredients = async (order) => {
    return await fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ingredients: order}),
    });
}
export const registerUserApi = ({email, password, name}) =>
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
    }).then((res) => checkResponse(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        });

export const forgotPasswordApi = ({email}) =>
    fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email
        }),
    }).then((res) => checkResponse(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        })

export const resetPasswordApi = ({password, token}) =>
    fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            password: password,
            token: token
        }),
    }).then((res) => checkResponse(res))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
        })
export const loginUserApi = ({email, password}) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }).then((res) => checkResponse(res))
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
        },
    });

export const refactoringUserApi = ({email, password, name}) =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
    })
