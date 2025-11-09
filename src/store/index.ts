import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/authSlice";
import ProfilSlice from "./slices/profileSlice";
import CategoriesSlice from "./slices/categoriesSlice";
import ProductsSlice from "./slices/productsSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        profile: ProfilSlice,
        category: CategoriesSlice,
        products: ProductsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
