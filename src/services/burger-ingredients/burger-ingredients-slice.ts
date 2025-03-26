import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getBurgerIngredients} from "../../utils/api";
import {TBurgerIngredientsState} from "./types";
import {TIngredient} from "../../utils/types/prop-types";

export const getIngredients = createAsyncThunk<TIngredient[]>(
    'burgerIngredients/getIngredients',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const res = await getBurgerIngredients();
        return res;
    }
);

export const initialState:TBurgerIngredientsState = {
    burgerIngredients: [],
    burgerIngredientsLoading: false,
    burgerIngredientsError: null
}
const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState,
    reducers: {},
    selectors:{
        getAllIngredients: (state) => state.burgerIngredients,
        getBurgerIngredientsLoading: (state) => state.burgerIngredientsLoading,
        getBurgerIngredientsError: (state) => state.burgerIngredientsError
    },
    extraReducers: (builder) => {
        builder
            .addCase(
            getIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
                state.burgerIngredients = action.payload;
                state.burgerIngredientsLoading = false;
                state.burgerIngredientsError = null;
            }
        )
            .addCase(getIngredients.pending, (state) => {
                state.burgerIngredientsLoading = true;
                state.burgerIngredientsError = null;
            })
            .addCase(
            getIngredients.rejected, (state, action) => {
                state.burgerIngredientsLoading = false;
                state.burgerIngredientsError = action.error.message || 'Произошла ошибка';
            }
        )
}
})
export default burgerIngredientsSlice.reducer;
export const {getAllIngredients,getBurgerIngredientsLoading,getBurgerIngredientsError} = burgerIngredientsSlice.selectors;
