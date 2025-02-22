import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getBurgerIngredients} from "../../utils/api.ts";

export const getIngredients = createAsyncThunk(
    'burgerIngredients/getIngredients',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return getBurgerIngredients();
    }
);
const initialState = {
    burgerIngredients: [],
    burgerIngredientsLoading: false,
    burgerIngredientsError: false
}
export const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState,
    selectors:{
        getAllIngredients: (state) => state.burgerIngredients,
        getBurgerIngredientsLoading: (state) => state.burgerIngredientsLoading,
        getBurgerIngredientsError: (state) => state.burgerIngredientsError
    },
    extraReducers: (builder) => {
        builder
            .addCase(
            getIngredients.fulfilled, (state, action) => {
                state.burgerIngredients = action.payload;
                state.burgerIngredientsLoading = false;
                state.burgerIngredientsError = false;
            }
        )
            .addCase(getIngredients.pending, (state) => {
                state.burgerIngredientsLoading = true;
                state.burgerIngredientsError = false;
            })
            .addCase(
            getIngredients.rejected, (state) => {
                state.burgerIngredientsLoading = false;
                state.burgerIngredientsError = true;
            }
        )
}
})
export default burgerIngredientsSlice.reducer;
export const {getAllIngredients,getBurgerIngredientsLoading,getBurgerIngredientsError} = burgerIngredientsSlice.selectors;
