import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    forgotPasswordApi, getUserApi,
    loginUserApi,
    logoutUserApi,
    refactoringUserApi,
    registerUserApi,
    resetPasswordApi
} from "../../utils/api.ts";


export const checkAuthUser = createAsyncThunk(
    'user/checkUserAuth',
    async (_,{dispatch}) =>{
       if (localStorage.getItem("accessToken")){
           getUserApi()
               .then((res)=>dispatch(setUser(res)))
               .finally(dispatch(checkUserStatus(true)))
       } else {
           dispatch(checkUserStatus(true))
       }
}
)
export const registerUser = createAsyncThunk(
    'user/registerUser',
    ({email, password, name}) => registerUserApi({email, password, name})
)
export const loginUser = createAsyncThunk(
    'user/loginUser',
    ({email, password}) => loginUserApi({email, password})
)
export const logoutUser = createAsyncThunk(
    'user/logoutUser', logoutUserApi
)
export const refactoringUser = createAsyncThunk(
    'user/refactoringUser',
    ({name, email, password}) => refactoringUserApi({name, email, password})
)
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    ({email}) => forgotPasswordApi({email})
)
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    ({password, token}) => resetPasswordApi({password, token})
)
export const getUser = createAsyncThunk(
    'user/getUser',
    () => getUserApi()
)
const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null,
    isAuthorized: false
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        checkUserStatus: (state) => {
            state.isAuthChecked = true;
        },
        setUser: (state,action)=>{
            state.user = action.payload;
        }
    },
    selectors: {
        getUserStateSelector: (state) => state,
        getUserSelector: (state) => state.user,
        isAuthorizedSelector: (state) => state.isAuthorized,
        getUserErrorSelector: (state) => state.error,
        getIsAuthCheckedSelector: (state) => state.isAuthChecked
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthorized = true;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthorized = true;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthorized = false;
                state.error = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(refactoringUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthorized = true;
                state.error = null;
            })
            .addCase(refactoringUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refactoringUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(resetPassword.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthorized = true;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            .addCase(checkAuthUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuthUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.isAuthChecked = false;
            })
            .addCase(checkAuthUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isAuthChecked = true;
            })
    }

});
export const {clearUserError,checkUserStatus,setUser} = userSlice.actions;
export const {getUserStateSelector,getIsAuthCheckedSelector, getUserSelector, isAuthorizedSelector, getUserErrorSelector} = userSlice.selectors;
export default userSlice.reducer;

