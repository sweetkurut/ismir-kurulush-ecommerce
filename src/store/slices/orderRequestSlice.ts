/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IOrderRequestList, IOrderRequestResponse, IOrderRequestTypes } from "../types";
import { storesApi } from "@/api";
import { handleApiError } from "@/utils/validation";

type InfoState = {
    loading: boolean;
    error: null | string;
    orders_req: IOrderRequestList[] | null;
    type_req: IOrderRequestTypes[] | null;
};

const initialState: InfoState = {
    loading: false,
    error: null,
    orders_req: null,
    type_req: null,
};

// export const fetchGetOrdersReq = createAsyncThunk<
//     IOrderRequestList[],
//     void,
//     { rejectValue: string }
// >(
//     "orders_req/fetchGetOrdersReq",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await storesApi.getReqOrder();
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(`Ошибка: ${error}`);
//         }
//     }
// );

export const fetchTypeReq = createAsyncThunk<IOrderRequestTypes[], void, { rejectValue: string }>(
    "type_req/fetchTypeReq",
    async (_, { rejectWithValue }) => {
        try {
            const response = await storesApi.getTypeReqOrder();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchGetOrdersReq = createAsyncThunk<IOrderRequestList[], void, { rejectValue: string }>(
    "orders_req/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await storesApi.getReqOrder();
            return response.data; // это уже массив
        } catch (error: any) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

export const fetchCreateOrdersReq = createAsyncThunk(
    "orders_req/fetchCreateOrdersReq",
    async (data: IOrderRequestResponse, { rejectWithValue }) => {
        try {
            const res = await storesApi.addReqOrder(data);
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(handleApiError(error, "Ошибка при создании заявки"));
        }
    }
);

const OrderRequestSlice = createSlice({
    name: "orders_req",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetOrdersReq.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetOrdersReq.fulfilled, (state, action) => {
                state.orders_req = action.payload;
                state.loading = false;
            })
            .addCase(fetchGetOrdersReq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при получении данных";
            })
            .addCase(fetchCreateOrdersReq.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCreateOrdersReq.fulfilled, (state, action) => {
                state.orders_req = [...(state.orders_req ?? []), action.payload];
            })

            .addCase(fetchCreateOrdersReq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при добавления данных";
            })
            .addCase(fetchTypeReq.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTypeReq.fulfilled, (state, action) => {
                state.type_req = action.payload;
                state.loading = false;
            })
            .addCase(fetchTypeReq.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? String(action.payload) : "Ошибка при получении данных";
            });
    },
});

export default OrderRequestSlice.reducer;
