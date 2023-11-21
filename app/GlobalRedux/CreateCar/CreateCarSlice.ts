import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CarDetails {
    type: string;
    body_type: string;
    color: string;
    year: number;
    mileage: number;
    gearbox: string;
    price: number;
    description: string;
    phone?: string
    title: string;
    fueltype: string;
    accidentfree: boolean;
    imageurl: string;
    drivetrain: string;
    istop: boolean;
  }
  

interface CarCreationState {
  carType: string | null;
  brand: string | null;
  model: string | null;
  details: CarDetails | null;
  models: string[];
}

const initialState: CarCreationState = {
  carType: null,
  brand: null,
  model: null,
  details: null,
  models: []
};

export const carCreationSlice = createSlice({
  name: 'carCreation',
  initialState,
  reducers: {
    setCarType: (state, action: PayloadAction<string>) => {
      state.carType = action.payload;
    },
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },

    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setModels: (state, action: PayloadAction<string[]>) => {
        state.models = action.payload;
      },
    setDetails: (state, action: PayloadAction<any>) => {
      state.details = action.payload;
    },
    resetSelections: (state) => {
      state.carType = null;
      state.brand = null;
      state.model = null;
      state.details = null;
    },
  },
});

// Export actions
export const { setCarType, setBrand, setModel, setModels, setDetails, resetSelections } = carCreationSlice.actions;
// Export reducer
export default carCreationSlice.reducer;
