export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};
// export const checkResponse = (res) => {
//     res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };