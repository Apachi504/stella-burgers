import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    src: '',
    name: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: ''
}

const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    selectors:{
        getIngredientDetails: (state) => state
    },
    reducers: {
        setIngredientDetails: (state, action) => {
            state.src = action.payload.image_large;
            state.name = action.payload.name;
            state.calories = action.payload.calories;
            state.proteins = action.payload.proteins;
            state.fat = action.payload.fat;
            state.carbohydrates = action.payload.carbohydrates;
        }
    }
})

export const { setIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
export const {getIngredientDetails} = ingredientDetailsSlice.selectors;