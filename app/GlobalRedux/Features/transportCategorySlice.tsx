'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type transportCategoryState = {
     activeCategory: number;
};

const initialState: transportCategoryState = {
    activeCategory: 0
};

export const transportCategorySlice = createSlice({
    name: 'transportCategory',
    initialState,
    reducers: {
        setActiveTransportCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload;
        },
    }
})

export const {setActiveTransportCategory } = transportCategorySlice.actions;

export default transportCategorySlice.reducer;
