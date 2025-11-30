import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IServiceDetail, Service } from "../types";
import { storesApi } from "@/api";

type InfoState = {
    loading: boolean;
    error: null | string;
    service: Service[] | null;
    detail: IServiceDetail | null;
    count?: number;
};

const initialState: InfoState = {
    error: null,
    loading: false,
    service: null,
    count: 3,
    detail: null,
};

export const fetchGetServices = createAsyncThunk<Service[], void, { rejectValue: string }>(
    "service/fetchGetServices",
    async (_, { rejectWithValue }) => {
        try {
            const res = await storesApi.getServices();
            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }
            return res.data as Service[];
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

// детальная информация о услуге
export const fetchGetServiceDetail = createAsyncThunk<IServiceDetail, number, { rejectValue: string }>(
    "detail/fetchGetServiceDetail",
    async (id, { rejectWithValue }) => {
        try {
            const res = await storesApi.getServiceDetail(id);

            if (res.status !== 200) {
                return rejectWithValue("Server Error");
            }

            return res.data as IServiceDetail;
        } catch (error) {
            return rejectWithValue(`Ошибка: ${error}`);
        }
    }
);

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchGetServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetServices.fulfilled, (state, action) => {
            state.service = action.payload;
            state.loading = false;
            state.count = action.payload.length;
        });
        addCase(fetchGetServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении категорий";
        });
        addCase(fetchGetServiceDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        addCase(fetchGetServiceDetail.fulfilled, (state, action) => {
            state.detail = action.payload;
            state.loading = false;
        });
        addCase(fetchGetServiceDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? String(action.payload) : "Ошибка при получении данных услуги";
        });
    },
});

export default serviceSlice.reducer;
