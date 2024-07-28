"use client";

import { VehicleType } from '@/src/shared/model/params';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type transportCategoryState = {
  activeCategory: VehicleType;
};

const initialState: transportCategoryState = {
  activeCategory: VehicleType.Car,
};

export const transportCategorySlice = createSlice({
  name: "transportCategory",
  initialState,
  reducers: {
    setActiveTransportCategory: (state, action: PayloadAction<VehicleType>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveTransportCategory } = transportCategorySlice.actions;

export default transportCategorySlice.reducer;
