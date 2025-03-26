import userSlice, {
    checkAuthUser,
    forgotPassword, getUser,
    initialState,
    loginUser,
    logoutUser,
    refactoringUser,
    registerUser, resetPassword
} from "./user-slice";
import {expect} from '@jest/globals';
import Login from "../../pages/login/login";

describe("userSlice", () => {

    it('должен вернуть the initial state', () => {
        const state = userSlice(undefined, {type: 'unknown'});
        expect(state).toEqual(initialState);
    });
    // registerUser
    it('должен обработать registerUser.pending', () => {
        const action = {type: registerUser.pending.type};
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
    });
    it('должен обработать registerUser.fulfilled', () => {
        const user = {id: '1', email: 'qwert@mail.ru'};
        const action = {
            type: registerUser.fulfilled.type,
            payload: {
                user, // Вложенный объект user
                accessToken: 'access-Token', // Добавляем токены
                refreshToken: 'refresh-Token'
            }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isLoading: false,
            error: null,
            isAuthorized: true,
            user: {
                user: {id: '1', email: 'qwert@mail.ru'},
                accessToken: 'access-Token',
                refreshToken: 'refresh-Token'
            }
        });
    });
    it('должен обработать registerUser.rejected', () => {
        const action = {
            type: registerUser.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
    // loginUser
    it('должен обработать loginUser.pending', () => {
        const action = {type: loginUser.pending.type};
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    })
    it('должен обработать loginUser.fulfilled', () => {
        const user = {id: '1', email: 'qwert@mail.ru'};
        const action = {
            type: loginUser.fulfilled.type,
            payload: {
                user, // Вложенный объект user
                accessToken: 'access-Token', // Добавляем токены
                refreshToken: 'refresh-Token'
            }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isLoading: false,
            error: null,
            isAuthorized: true,
            user: { // Теперь state.user будет содержать весь payload
                user: {id: '1', email: 'qwert@mail.ru'}, // Вложенный user
                accessToken: 'access-Token',
                refreshToken: 'refresh-Token'
            }
        });
    })
    it('должен обработать loginUser.rejected', () => {
        const action = {
            type: loginUser.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
    //logoutUser
    it('должен обработать logoutUser.pending', () => {
        const action = {type: logoutUser.pending.type};
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    })
    it('должен обработать logoutUser.fulfilled', () => {
        const action = {type: logoutUser.fulfilled.type};
        const state = userSlice({
                ...initialState,
                user: {email: 'test@test.com', name: ''},
                isAuthorized: true
            },
            action);
        expect(state).toEqual({
            ...initialState,
            user: null,
            isAuthorized: false,
            isLoading: false,
            error: null
        });
    })
    it('должен обработать logoutUser.rejected', () => {
        const action = {
            type: logoutUser.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
    //refactoringUser
    it('должен обработать refactoringUser.pending', () => {
        const action = {type: refactoringUser.pending.type};
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    })
    it('должен обработать refactoringUser.fulfilled', () => {
        const mockUserData = {
            user: {id: '2', email: 'new@mail.ru'},
            accessToken: 'token-123',
            refreshToken: 'refresh-123'
        };
        const action = {
            type: refactoringUser.fulfilled.type,
            payload: mockUserData
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            user: mockUserData,
            isAuthorized: true,
            isLoading: false,
            error: null
        });
    })
    it('должен обработать refactoringUser.rejected', () => {
        const action = {
            type: refactoringUser.rejected.type,
            error: {message: 'Ошибка'}
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
    // forgotPassword
    it('должен обработать forgotPassword.pending', () => {
        const action = { type: forgotPassword.pending.type };
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('должен обработать forgotPassword.fulfilled', () => {
        const action = { type: forgotPassword.fulfilled.type };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isLoading: false,
            error: null
        });
    });

    it('должен обработать forgotPassword.rejected', () => {
        const action = {
            type: forgotPassword.rejected.type,
            error: { message: 'Ошибка' }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isLoading: false
        });
    });
    // resetPassword
    it('должен обработать resetPassword.pending', () => {
        const action = { type: resetPassword.pending.type };
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('должен обработать resetPassword.fulfilled', () => {
        const action = { type: resetPassword.fulfilled.type };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            isLoading: false,
            error: null
        });
    });

    it('должен обработать resetPassword.rejected', () => {
        const action = {
            type: resetPassword.rejected.type,
            error: { message: 'Ошибка' }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isLoading: false
        });
    });
    // getUser
    it('должен обработать getUser.pending', () => {
        const action = { type: getUser.pending.type };
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('должен обработать getUser.fulfilled', () => {
        const mockPayload = {
            user: { id: '1', email: 'test@mail.ru', name: 'Test User' },
            accessToken: 'new-access-token',
            refreshToken: 'new-refresh-token'
        };

        const action = {
            type: getUser.fulfilled.type,
            payload: mockPayload
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            user: mockPayload,
            isAuthorized: true,
            isLoading: false,
            error: null
        });
    });

    it('должен обработать getUser.rejected', () => {
        const action = {
            type: getUser.rejected.type,
            error: { message: 'Ошибка' }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
    // checkAuthUser
    it('должен обработать checkAuthUser.pending', () => {
        const action = { type: checkAuthUser.pending.type };
        const state = userSlice(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('должен обработать checkAuthUser.fulfilled', () => {
        const mockPayload = {
            user: { id: '1', email: 'user@mail.ru' },
            accessToken: 'valid-token',
            refreshToken: 'valid-refresh-token'
        };

        const action = {
            type: checkAuthUser.fulfilled.type,
            payload: mockPayload
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            isLoading: false,
            error: null,
            user: mockPayload,
            isAuthChecked: true,
            isAuthorized: false,
    });
    });

    it('должен обработать checkAuthUser.rejected', () => {
        const action = {
            type: checkAuthUser.rejected.type,
            error: { message: 'Ошибка' }
        };
        const state = userSlice(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Ошибка',
            isAuthorized: false,
            isLoading: false
        });
    });
})