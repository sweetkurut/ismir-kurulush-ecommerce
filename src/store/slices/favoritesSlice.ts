/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storesApi } from "@/api";
import type { IFavorites } from "../types";

type InfoState = {
    loading: boolean;
    error: null | string;
    favorites: IFavorites | null;
};

const initialState: InfoState = {
    loading: false,
    error: null,
    favorites: null,
};

export const fetchFavorites = createAsyncThunk<IFavorites, void, { rejectValue: string }>(
    "favorites/fetchFavorites",
    async (_, { rejectWithValue }) => {
        try {
            const data = await storesApi.getFavorites();
            return data;
        } catch (error: any) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchAddFavorites = createAsyncThunk<IFavorites, number, { rejectValue: string }>(
    "favorites/fetchAddFavorites",
    async (id, { rejectWithValue }) => {
        try {
            await storesApi.addFavorite(id);
            const data = await storesApi.getFavorites();
            return data;
        } catch (error: any) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const FavoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                state.loading = false;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при получении данных";
            })
            .addCase(fetchAddFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                state.loading = false;
            })
            .addCase(fetchAddFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при добавления данных";
            });
    },
});

export default FavoritesSlice.reducer;
