'use client';

import { configureStore } from '@reduxjs/toolkit';
import carMakesReducer from './Features/counter/carMakesSlice';

export const store = configureStore({
    reducer: {
        carMakes: carMakesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
