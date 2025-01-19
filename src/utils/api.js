import {BASE_URL} from "./constant.js";

export const getBurgerIngredients = () => {
     return fetch (`${BASE_URL}/ingredients`, {
         headers: {
             "Content-Type": "application/json; charset=utf-8",
         },
     })
        .then(getResponse)
};
export const getOrder = (order) => {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ingredients : order}),
    }).then(getResponse)
    .catch(error => {
        console.error("Error in getOrder:", error);
        throw error;
    });
}
const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};
