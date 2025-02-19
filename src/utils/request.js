import {BASE_URL} from "./constant.js";

// export const request = (endPoint, options) => {
//     return fetch(BASE_URL+endPoint, options).then(getResponse);
// };

export const request = (endPoint, options) => {
    return fetch(BASE_URL+endPoint, options);
};