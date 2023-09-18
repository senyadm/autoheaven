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

type CarState = {
    allCars: CarResult[];
    filteredCars: CarResult[];
    status: RequestStatus;
    carBrands: string[]; 
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

const initialState: CarState = {
    allCars: [],
    filteredCars: [],
    carBrands: [], 
    status: RequestStatus.Idle,
  };

  export const fetchAllCars = createAsyncThunk(
    'carFiltersAndResults/fetchAllCars',
    async (_, { rejectWithValue }) => {
      try {
        const response = await client.get('/car_makes');
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );


type LoginCredentials = {
  username: string;
  password: string;
};

export const loginReducer = createAsyncThunk(
  "carFiltersAndResults/login",
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await client.post("/api/token", {
        username,
        password,
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
      setFilters: (state, action: PayloadAction<FilterState>) => {
        const filters = action.payload;
  
        state.filteredCars = state.allCars.filter(car => {
          // Implement your filtering logic here based on the car properties and filters
          return true; // Return true if the car matches the filter, false otherwise
        });
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllCars.pending, (state) => {
            state.status = RequestStatus.Loading;
          })
          .addCase(fetchAllCars.fulfilled, (state, action: PayloadAction<{ car_makes: string[] }>) => {
            state.status = RequestStatus.Idle;
            state.carBrands = action.payload.car_makes;
          })
          .addCase(fetchAllCars.rejected, (state) => {
            state.status = RequestStatus.Failed;
          });
      },
});
export const selectCarBrands = (state: RootState) => state.carFiltersAndResults.carBrands;
export const { setFilters } = carFiltersAndResultsSlice.actions;
export default carFiltersAndResultsSlice.reducer;
