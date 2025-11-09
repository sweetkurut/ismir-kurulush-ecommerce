import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductDetail, Products } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    products: Products[] | null;
    product: ProductDetail | null;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    products: null,
    product: null,
};

export const fetchGetProducts = createAsyncThunk<Products[], void, { rejectValue: string }>(
    "products/fetchGetProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getProducts();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as Products[];
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchGetDetailProducts = createAsyncThunk<ProductDetail, number, { rejectValue: string }>(
    "product/fetchGetDetailProducts",
    async (id, { rejectWithValue }) => {
        try {
            const res = await storesApi.getProductById(id);
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as ProductDetail;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchGetProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
        addCase(fetchGetProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении продуктов";
        });
        addCase(fetchGetDetailProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetDetailProducts.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loading = false;
        });
        addCase(fetchGetDetailProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении продукта по ID";
        });
    },
});

export default productsSlice.reducer;
