"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VehicleType } from "../../../src/entities/filters";

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
