import {BASE_URL} from "./constant.js";
import {getResponse} from "./getResponse.js";

export const request = (endPoint, options) => {
    return fetch(BASE_URL+endPoint, options).then(getResponse);
};