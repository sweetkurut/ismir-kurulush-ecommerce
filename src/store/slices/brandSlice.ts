import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Brand } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    brand: Brand | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    brand: null,
};

export const fetchGetBrand = createAsyncThunk<Brand, void, { rejectValue: string }>(
    "brand/fetchGetBrand",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getBrands();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as Brand;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchGetBrand.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetBrand.fulfilled, (state, action) => {
            state.brand = action.payload;
            state.loading = false;
        });
        addCase(fetchGetBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении категорий";
        });
    },
});

export default brandSlice.reducer;
