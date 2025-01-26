import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerUser} from "../../../utils/api.js";

export const registrationUser =  createAsyncThunk(
    'registerUser/registerUser',
    async ({email, password, name}) => {
        const user = {email, password, name};
        const response = await registerUser(user);
        return response.user;
    }
)
const initialState={
    registerUserLoading: false,
    registerUserError: false,
    user: {},
    registerUserSuccess: false
};
export const registerUserSlice = createSlice({
    name: 'registerUser',
    initialState,
    selectors:{
        getRegisterUserLoading: (state) => state.registerUserLoading,
        getRegisterUserError: (state) => state.registerUserError,
        getUser: (state) => state.user,
        getRegisterUserSuccess: (state) => state.registerUserSuccess
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.pending, (state) => {
                state.registerUserLoading = true;
                state.registerUserError = false;
            })
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.registerUserError = false;
                state.registerUserLoading = false;
                state.user = action.payload;
                state.registerUserSuccess = true;
            })
            .addCase(registrationUser.rejected, (state) => {
                state.registerUserLoading = false;
                state.registerUserError = true;
            })
    }
});
export default registerUserSlice.reducer;