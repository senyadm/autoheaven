'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CarMakesState = {
    carMakes: string[];
    status: 'idle' | 'loading' | 'failed';
};

const initialState: CarMakesState = {
    carMakes: [],
    status: 'idle'
};

export const carMakesSlice = createSlice({
    name: 'carMakes',
    initialState,
    reducers: {
        setCarMakes: (state, action: PayloadAction<string[]>) => {
            state.carMakes = action.payload;
        },
        setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
            state.status = action.payload;
        }
    }
})

export const { setCarMakes, setStatus } = carMakesSlice.actions;

export default carMakesSlice.reducer;
