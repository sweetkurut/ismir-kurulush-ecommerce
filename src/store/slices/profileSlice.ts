import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storesApi } from "@/api";
import type { IProfile, IProfileUpdate, IProfileUpdatePassword } from "../types";

type InfoState = {
    loading: boolean;
    error: null | string;
    profile: IProfile | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    profile: null,
};

export const fetchGetProfile = createAsyncThunk<IProfile, void, { rejectValue: string }>(
    "profile/fetchGetProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getProfile();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as IProfile;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchUpdateProfile = createAsyncThunk<IProfile, IProfileUpdate, { rejectValue: string }>(
    "profile/fetchUpdateProfile",
    async (data, { rejectWithValue }) => {
        try {
            const res = await storesApi.updateProfile(data);
            if (res.status !== 200) {
                return rejectWithValue(`Ошибка сервера: ${res.status}`);
            }
            return res.data as IProfile;
        } catch (error: unknown) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchUpdateProfilePassword = createAsyncThunk<void, IProfileUpdatePassword, { rejectValue: string }>(
    "profile/fetchUpdateProfilePassword",
    async (data, { rejectWithValue }) => {
        try {
            const res = await storesApi.updateProfilePassword(data);
            if (res.status !== 200) {
                return rejectWithValue(`Ошибка сервера: ${res.status}`);
            }
            return res.data as void;
        } catch (error: unknown) {
            console.error(error);
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchDeleteProfile = createAsyncThunk<void, void, { rejectValue: string }>(
    "profile/fetchDeleteProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.deleteProfile();
            if (res.status !== 204) {
                return rejectWithValue(`Ошибка сервера: ${res.status}`);
            }
            return res.data as void;
        } catch (error: unknown) {
            console.error(error);
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

// export const fetchLogout = createAsyncThunk<void, void, { rejectValue: string }>(
//     "profile/fetchLogout",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await storesApi.logout();
//             console.log(res);
//             if (res.status !== 201) {
//                 return rejectWithValue(`Ошибка сервера: ${res.status}`);
//             }
//             return res.data as void;
//         } catch (error: any) {
//             console.error(error);
//             return rejectWithValue(`Ошибка: ${error}`);
//         }
//     }
// );

export const fetchVerifyEmailUpdate = createAsyncThunk<IProfile, { code: string }, { rejectValue: string }>(
    "profile/verifyEmailUpdate",
    async (data, { rejectWithValue }) => {
        try {
            const res = await storesApi.updateNewEmail(data);
            if (res.status !== 200) {
                return rejectWithValue(`Ошибка сервера: ${res.status}`);
            }
            return res.data as IProfile;
        } catch (error: unknown) {
            console.error(error);
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchResendEmailUpdateCode = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
    "profile/resendEmailUpdateCode",
    async (data, { rejectWithValue }) => {
        try {
            const res = await storesApi.updateProfile(data);
            if (res.status !== 200) {
                return rejectWithValue(`Ошибка сервера: ${res.status}`);
            }
            return res.data as void;
        } catch (error: unknown) {
            console.error(error);
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const AuthSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
        clearProfile: (state) => {
            state.profile = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchGetProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        });
        addCase(fetchGetProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении профиля";
        });

        // Обработка обновления профиля
        addCase(fetchUpdateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchUpdateProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        });
        addCase(fetchUpdateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при обновлении профиля";
        });

        addCase(fetchVerifyEmailUpdate.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchVerifyEmailUpdate.fulfilled, (state) => {
            state.loading = false;
        });
        addCase(fetchVerifyEmailUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при подтверждении email";
        });

        addCase(fetchResendEmailUpdateCode.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchResendEmailUpdateCode.fulfilled, (state) => {
            state.loading = false;
        });
        addCase(fetchResendEmailUpdateCode.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при отправке кода подтверждения";
        });
    },
});

export const { clearProfileError, clearProfile } = AuthSlice.actions;

export default AuthSlice.reducer;
