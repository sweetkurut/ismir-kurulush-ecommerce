// store/slices/authSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeTokens, saveTokens, getRefreshToken } from "@/utils/auth";
import { handleApiError } from "@/utils/validation";
import { storesApi } from "@/api";
import type {
    ILoginData,
    ILoginResponse,
    IResetPassword,
    ISetPassword,
    ISignUpEmail,
    IVerifyCode,
} from "../types";

type AuthState = {
    loading: boolean;
    error: null | string;
    login: ILoginResponse | null;
    isAuthenticated: boolean;
};

// Функция для синхронной проверки токенов
const checkAuthStatus = (): boolean => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        return !!(accessToken && refreshToken);
    } catch {
        return false;
    }
};

// Создаем начальное состояние с проверкой токенов
const initialState: AuthState = {
    error: null,
    loading: false,
    login: null,
    isAuthenticated: checkAuthStatus(),
};

export const fetchLogin = createAsyncThunk(
    "auth/fetchLogin",
    async (data: ILoginData, { rejectWithValue }) => {
        try {
            const res = await storesApi.login(data);
            // ВАЖНО: Сохраняем токены
            await saveTokens(res.data.access, res.data.refresh);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при авторизации"));
        }
    }
);

export const fetchRefreshToken = createAsyncThunk(
    "auth/fetchRefreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = await getRefreshToken();
            if (!refreshToken) {
                throw new Error("No refresh token");
            }

            const res = await storesApi.refreshToken(refreshToken);
            if (res.data && res.data.access && res.data.refresh) {
                await saveTokens(res.data.access, res.data.refresh);
            }
            return res.data;
        } catch (error: unknown) {
            await removeTokens();
            return rejectWithValue(handleApiError(error, "Ошибка при обновлении токена"));
        }
    }
);

export const fetchSignUp = createAsyncThunk(
    "auth/fetchSignUp",
    async (data: ISignUpEmail, { rejectWithValue }) => {
        try {
            const res = await storesApi.signUp(data);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при регистрации"));
        }
    }
);

export const fetchVerifyCode = createAsyncThunk(
    "auth/fetchVerifyCode",
    async (data: IVerifyCode, { rejectWithValue }) => {
        try {
            const res = await storesApi.verifyCode(data);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при проверке кода"));
        }
    }
);

export const fetchSetPassword = createAsyncThunk(
    "auth/fetchSetPassword",
    async (data: ISetPassword, { rejectWithValue }) => {
        try {
            const res = await storesApi.setPassword(data);
            // Сохраняем токены после установки пароля
            if (res.data.access && res.data.refresh) {
                await saveTokens(res.data.access, res.data.refresh);
            }
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при установке пароля"));
        }
    }
);

export const fetchResetPassword = createAsyncThunk(
    "auth/fetchResetPassword",
    async (data: IResetPassword, { rejectWithValue }) => {
        try {
            const res = await storesApi.resetPassword(data);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при сбросе пароля"));
        }
    }
);

export const fetchForgotPassword = createAsyncThunk(
    "auth/fetchForgotPassword",
    async (data: ISignUpEmail, { rejectWithValue }) => {
        try {
            const res = await storesApi.forgotPassword(data);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при сбросе пароля"));
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.login = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            removeTokens();
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        // Добавляем action для принудительной проверки авторизации
        checkAuth: (state) => {
            state.isAuthenticated = checkAuthStatus();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.login = action.payload;
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
                // Сохраняем токены
                saveTokens(action.payload.access, action.payload.refresh);
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            .addCase(fetchRefreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                if (state.login) {
                    state.login.access = action.payload.access;
                    state.login.refresh = action.payload.refresh;
                } else {
                    state.login = {
                        id: 0,
                        email: "",
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                    };
                }
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(fetchRefreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.login = null;
                state.isAuthenticated = false;
                removeTokens();
            })

            .addCase(fetchSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSignUp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при регистрации";
            })

            .addCase(fetchVerifyCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVerifyCode.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchVerifyCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при проверке кода";
            })

            .addCase(fetchSetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.login = {
                    id: action.payload.id || 0,
                    email: action.payload.user || "",
                    access: action.payload.access,
                    refresh: action.payload.refresh,
                };
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(fetchSetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при установке пароля";
            })

            .addCase(fetchForgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchForgotPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                    ? String(action.payload)
                    : "Ошибка при отправке кода восстановления";
            })

            .addCase(fetchResetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при сбросе пароля";
            });
    },
});

export const { logout, setError, clearError, checkAuth } = authSlice.actions;
export default authSlice.reducer;
