'use client';

import { configureStore } from '@reduxjs/toolkit';
import carMakesReducer from './Features/counter/carMakesSlice';
import transportCategoryReducer from './Features/counter/transportCategorySlice';

export const store = configureStore({
    reducer: {
        carMakes: carMakesReducer,
        transportCategory: transportCategoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
