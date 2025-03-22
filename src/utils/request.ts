import {BASE_URL} from "./constant";

// export const request = (endPoint, options) => {
//     return fetch(BASE_URL+endPoint, options).then(getResponse);
// };

export const request = (endPoint: string, options: RequestInit) => {
    return fetch(BASE_URL+endPoint, options);
};