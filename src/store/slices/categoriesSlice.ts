import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ICategoryResponse } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    category: ICategoryResponse | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    category: null,
};

export const fetchGetCategory = createAsyncThunk<ICategoryResponse, void, { rejectValue: string }>(
    "category/fetchGetCategory",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getCategories();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as ICategoryResponse;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const categoriesSlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchGetCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            state.loading = false;
        });
        addCase(fetchGetCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении категорий";
        });
    },
});

export default categoriesSlice.reducer;
