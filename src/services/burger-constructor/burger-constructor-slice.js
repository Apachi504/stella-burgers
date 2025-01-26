import {createSelector, createSlice} from "@reduxjs/toolkit";
import {v6} from 'uuid';

const initialState = {
    bun: null,
    ingredients: []
}

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun: {
            prepare: (bun) => {
                return {
                    payload: {
                        ...bun,
                        id: v6()
                    }
                }
            },
            reducer: (state, action) => {
                state.bun = action.payload;
            }
        },
        addIngredient: {
            prepare: (ingredient) => {
                return {
                    payload: {
                        ...ingredient,
                        id: v6()
                    }
                }
            },
            reducer: (state, action) => {
                state.ingredients.push(action.payload);
            }
        },
        sortIngredients: (state, action) => {
            const draggedItem = state.ingredients[action.payload.dragIndex];
            const updatedIngredients = [...state.ingredients];
            updatedIngredients.splice(action.payload.dragIndex, 1);
            updatedIngredients.splice(action.payload.hoverIndex, 0, draggedItem);
            state.ingredients = updatedIngredients;
        },
        removeIngredient: (state, action) => {
            const index = state.ingredients.findIndex(
                (item) => item.id === action.payload
            );
            if (index !== -1) {
                state.ingredients = state.ingredients.filter(
                    (item) => item.id !== action.payload
                );
            }
        },
        resetConstructor: (state, action) => {
            Object.assign(state, initialState);
        }
    },

})
export default burgerConstructorSlice.reducer;
export const {
    addBun,
    addIngredient,
    removeIngredient,
    sortIngredients,
    resetConstructor
} = burgerConstructorSlice.actions;
