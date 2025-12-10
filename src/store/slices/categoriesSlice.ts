import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CategoryCatalog, ICategory } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    category: ICategory[] | null;
    catalog_category: CategoryCatalog[] | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    category: null,
    catalog_category: null,
};

export const fetchGetCategory = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
    "category/fetchGetCategory",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getCategories();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as ICategory[];
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchGetCatalogCategories = createAsyncThunk<CategoryCatalog[], void, { rejectValue: string }>(
    "catalog_category/fetchGetCatalogCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getCategoryCatalog({});
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as CategoryCatalog[];
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
        addCase(fetchGetCatalogCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetCatalogCategories.fulfilled, (state, action) => {
            state.catalog_category = action.payload;
            state.loading = false;
        });
        addCase(fetchGetCatalogCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении категорий";
        });
    },
});

export default categoriesSlice.reducer;
