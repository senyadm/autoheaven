import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../client';

enum RequestStatus {
    Idle = 'idle',
    Loading = 'loading',
    Failed = 'failed'
}

type CarResult = {
    id: number;
    name: string;
    // ... other properties
};

type FilterState = {
    price: [number, number];
    mileage: number;
    year: number;
    brandAndModel: string;
    vehicleBody: string;
    fuelType: string;
    results: CarResult[];
    status: RequestStatus;
};

const initialState: FilterState = {
    price: [0, 0],
    mileage: 0,
    year: 0,
    brandAndModel: "",
    vehicleBody: "",
    fuelType: "",
    results: [],
    status: RequestStatus.Idle,
};

export const fetchCarResults = createAsyncThunk(
    'carFiltersAndResults/fetchCarResults',
    async (filters: FilterState, { rejectWithValue }) => {
      try {
        const response = await client.get('/api/cars', {
          params: {
            price: filters.price.join(","),
            mileage: filters.mileage,
            year: filters.year,
            brandAndModel: filters.brandAndModel,
            vehicleBody: filters.vehicleBody,
            fuelType: filters.fuelType,
          }
        });
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
);

export const carFiltersAndResultsSlice = createSlice({
    name: 'carFiltersAndResults',
    initialState,
    reducers: {
        setPrice: (state, action: PayloadAction<[number, number]>) => {
            state.price = action.payload;
        },
        setMileage: (state, action: PayloadAction<number>) => {
            state.mileage = action.payload;
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload;
        },
        setBrandAndModel: (state, action: PayloadAction<string>) => {
            state.brandAndModel = action.payload;
        },
        setVehicleBody: (state, action: PayloadAction<string>) => {
            state.vehicleBody = action.payload;
        },
        setFuelType: (state, action: PayloadAction<string>) => {
            state.fuelType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarResults.pending, (state) => {
                state.status = RequestStatus.Loading;
            })
            .addCase(fetchCarResults.fulfilled, (state, action: PayloadAction<CarResult[]>) => {
                state.status = RequestStatus.Idle;
                state.results = action.payload;
            })
            .addCase(fetchCarResults.rejected, (state) => {
                state.status = RequestStatus.Failed;
                // Optionally add an error property to store the error message
            });
    },
});

export const { setPrice, setMileage} = carFiltersAndResultsSlice.actions;
export default carFiltersAndResultsSlice.reducer;
