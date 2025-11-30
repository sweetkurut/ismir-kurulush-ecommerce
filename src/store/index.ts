import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/authSlice";
import ProfilSlice from "./slices/profileSlice";
import CategoriesSlice from "./slices/categoriesSlice";
import ProductsSlice from "./slices/productsSlice";
import SortingSlice from "./slices/sortingSlice";
import Favorites from "./slices/favoritesSlice";
import OrderRequestSlice from "./slices/orderRequestSlice";
import CartSlice from "./slices/cartSlice";
import BrandSlice from "./slices/brandSlice";
import FilterSlice from "./slices/filterSlice";
import ServiceSlice from "./slices/serviceSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        profile: ProfilSlice,
        category: CategoriesSlice,
        products: ProductsSlice,
        sorting: SortingSlice,
        favorites: Favorites,
        orderRequest: OrderRequestSlice,
        cart: CartSlice,
        brand: BrandSlice,
        filters: FilterSlice,
        service: ServiceSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
