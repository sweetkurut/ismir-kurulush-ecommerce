import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storesApi } from "@/api";
import type { Cart, AddToCartRequest, RemoveCartItemRequest, UpdateCartItemRequest } from "../types";

interface CartState {
    cart: Cart | null;
    loading: boolean;
    addLoading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    addLoading: false,
    error: null,
};

// Получить корзину
export const fetchGetCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getCartsList();
            return res.data as Cart;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.detail || "Ошибка загрузки корзины");
        }
    }
);

// Добавить товар в корзину
export const fetchAddToCart = createAsyncThunk<Cart, AddToCartRequest, { rejectValue: string }>(
    "cart/addToCart",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await storesApi.addToCart(payload); // POST /add_item/
            return res.data as Cart; // бэк возвращает обновлённую корзину
        } catch (error: any) {
            const msg = error?.response?.data?.detail || "Не удалось добавить в корзину";
            return rejectWithValue(msg);
        }
    }
);

// Обновить количество товара в корзине
export const updateCartItem = createAsyncThunk<Cart, UpdateCartItemRequest, { rejectValue: string }>(
    "cart/updateCartItem",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await storesApi.updateCartItem(payload);
            return res.data as Cart;
        } catch (error: any) {
            const msg =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                "Не удалось обновить количество";
            return rejectWithValue(msg);
        }
    }
);

// Удалить товар из корзины
export const removeCartItem = createAsyncThunk<Cart, RemoveCartItemRequest, { rejectValue: string }>(
    "cart/removeCartItem",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await storesApi.removeCartItem(payload);
            return res.data as Cart;
        } catch (error: any) {
            const msg = error?.response?.data?.detail || "Не удалось удалить товар из корзины";
            return rejectWithValue(msg);
        }
    }
);

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // === Получение корзины ===
            .addCase(fetchGetCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchGetCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // === Добавление в корзину ===
            .addCase(fetchAddToCart.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cart = action.payload;
            })
            .addCase(fetchAddToCart.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || null;
            })

            // === Обновление количества ===
            .addCase(updateCartItem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cart = action.payload;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || null;
            })

            // === Удаление товара ===
            .addCase(removeCartItem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cart = action.payload;
                // Если корзина стала пустой — можно обнулить
                if (action.payload.items.length === 0) {
                    state.cart = null;
                }
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || null;
            });
    },
});

export type { CartState };
export const { clearCart } = CartSlice.actions;
export default CartSlice.reducer;
