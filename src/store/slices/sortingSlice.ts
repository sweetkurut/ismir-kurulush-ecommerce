import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SortingResponse } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    sorting: SortingResponse | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    sorting: null,
};

export const fetchGetSorting = createAsyncThunk<SortingResponse, void, { rejectValue: string }>(
    "sorting/fetchGetSorting",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getSortingOptions();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            } // ИСПРАВЛЕНО: Возвращаем ОДИН объект
            return res.data as SortingResponse;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const sortingSlice = createSlice({
    name: "sorting",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchGetSorting.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetSorting.fulfilled, (state, action) => {
            state.sorting = action.payload;
            state.loading = false;
        });
        addCase(fetchGetSorting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении сортировки";
        });
    },
});

export default sortingSlice.reducer;
