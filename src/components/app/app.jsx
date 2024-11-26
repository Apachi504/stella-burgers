import { useEffect, useState } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.scss";

function App() {
  const src = "https://norma.nomoreparties.space";
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: {},
  });

  useEffect(() => {
    getBurgerIngredients();
  }, []);
  const getBurgerIngredients = async () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(src + "/api/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error("Network response was not ok"));
      })
      .then((data) => setState({ ...state, isLoading: false, data }))
      .catch(() => setState({ ...state, hasError: true, isLoading: false }));
  };
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients burger={state.data} />
        <BurgerConstructor burger={state.data} />
      </main>
    </>
  );
}

export default App;
