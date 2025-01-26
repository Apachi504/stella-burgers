import {BASE_URL} from "./constant.js";
import {request} from "./request.js";

// export const getBurgerIngredients = () => {
//         return fetch (`${BASE_URL}/ingredients`, {
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//             },
//         }).then(getResponse)
// };
// export const getOrder = (order) => {
//     return fetch(`${BASE_URL}/orders`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json; charset=utf-8",
//         },
//         body: JSON.stringify({ingredients : order}),
//     }).then(getResponse)
//     .catch(error => {
//         console.error("Error in getOrder:", error);
//         throw error;
//     });
// }
export const getBurgerIngredients = () => {
    return request('/ingredients', {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
};
export const getOrder = (order) => {
    return request("/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ingredients : order}),
    })
};
export const registerUser = ({email, password, name}) => {
    return request("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
    })
};
