export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_USER_URL = ()=>{
    return `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')?.replace('Bearer ', '')}`;
}
