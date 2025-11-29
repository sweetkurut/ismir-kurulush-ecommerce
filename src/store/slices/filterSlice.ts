import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    category?: string;
    brands?: string[];
    price_lte?: number;
}

const initialState: FilterState = {};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<FilterState>>) {
            return { ...state, ...action.payload };
        },
        clearFilters() {
            return initialState;
        },
    },
});

export const { setFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
