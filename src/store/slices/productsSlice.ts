/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductDetail, Products } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    products: Products[] | null;
    product: ProductDetail | null;

    // Добавляем сюда дерево категорий
    categoryTree: CategoryNode[];
    categoryTreeLoading: boolean;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    products: null,
    product: null,
    categoryTree: [],
    categoryTreeLoading: false,
};

interface ProductQueryParams {
    page?: number;
    ordering?: string;
    [key: string]: any;
}

// Тип для дерева (Ant Design Tree)
export interface CategoryNode {
    key: string;
    title: string;
    children?: CategoryNode[];
}

export const fetchGetProducts = createAsyncThunk<Products[], ProductQueryParams, { rejectValue: string }>(
    "products/fetchGetProducts",
    async (params, { rejectWithValue }) => {
        try {
            const res = await storesApi.getProducts(params);
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

export const fetchCategoryTree = createAsyncThunk<CategoryNode[], void, { rejectValue: string }>(
    "products/fetchCategoryTree",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getProducts({ limit: 500 }); // бери побольше, чтобы все категории поймать
            if (res.status !== 200) throw new Error("Server error");

            const products = res.data as any[];

            const map = new Map<number, CategoryNode>();
            const parentLinks = new Map<number, number>(); // childId → parentId

            // Собираем все категории
            products.forEach((p) => {
                if (Array.isArray(p.categories)) {
                    p.categories.forEach((cat: any) => {
                        const id = cat.id;
                        const name = cat.name;
                        const parent = cat.parent;

                        if (!map.has(id)) {
                            map.set(id, {
                                key: id.toString(),
                                title: name,
                                children: parent === null ? [] : undefined,
                            });
                        }

                        if (parent !== null) {
                            parentLinks.set(id, parent.id);
                        }
                    });
                }
            });

            // Связываем детей с родителями
            parentLinks.forEach((parentId, childId) => {
                const parent = map.get(parentId);
                const child = map.get(childId);
                if (parent && child) {
                    if (!parent.children) parent.children = [];
                    if (!parent.children.some((c) => c.key === child.key)) {
                        parent.children.push(child);
                    }
                }
            });

            // Корневые — те, у кого нет родителя
            const roots: CategoryNode[] = [];
            map.forEach((node, id) => {
                if (!parentLinks.has(id)) {
                    roots.push(node);
                }
            });

            return roots.length > 0 ? roots : Array.from(map.values());
        } catch (error: any) {
            return rejectWithValue(error.message || "Не удалось загрузить категории");
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
        addCase(fetchCategoryTree.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchCategoryTree.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryTree = action.payload;
        });
        addCase(fetchCategoryTree.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Ошибка детали";
        });
    },
});

export default productsSlice.reducer;
