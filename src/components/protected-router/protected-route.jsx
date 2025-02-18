import {useDispatch, useSelector} from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {checkAuthUser, getIsAuthCheckedSelector, getUserSelector} from "../../services/user/user-slice.js";
import {useEffect} from "react";
import Loader from "../loader/loader.jsx";

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const  user = useSelector(getUserSelector);
  const isAuthChecked = useSelector(getIsAuthCheckedSelector);

  const location = useLocation();
  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return <p>Loading</p>;
  }
  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    const {from} = location.state || {from:{ pathname: '/'} };
    return <Navigate replace to={from} />;
  }
  if (!onlyUnAuth && !user) {
    // Пользователь не авторизован и роут для неавторизованного пользователя
    return <Navigate to="/login" replace state={{ from: location}} />;
  }
  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);
