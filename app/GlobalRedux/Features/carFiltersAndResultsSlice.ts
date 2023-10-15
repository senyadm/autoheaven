import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../client';

enum RequestStatus {
    Idle = 'idle',
    Loading = 'loading',
    Failed = 'failed'
}

type CarResult = {
  id: number;
  make: string;
  color: string;
  mileage: number;
  price: number;
  seller_id: number;
  title: string | null;
  accidentfree: boolean | null;
  imageurl: string | null;
  istop: boolean | null;
  model: string;
  type: string;
  year: number;
  gearbox: string | null;
  description: string;
  created_at: string;
  fueltype: string | null;
  drivetrain: string | null;
};

type CarState = {
    allCars: CarResult[];
    filteredCars: CarResult[];
    status: RequestStatus;
    carMakes: string[]; 
    brandsWithModels: brandsWithModels[];
  };
  
export type  brandsWithModels = {
    [brand: string]: string[];
  }

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
    carMakes: [], 
    brandsWithModels: [],
    status: RequestStatus.Idle,
  };

  export const fetchAllCars = createAsyncThunk(
    'carFiltersAndResults/fetchAllCars',
    async (_, { rejectWithValue }) => {
      try {
        const response = await client.get('/api/car_makes');
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchBrands = createAsyncThunk(
    'carFiltersAndResults/fetchBrands',
    async (_, { rejectWithValue }): Promise<brandsWithModels[]>=> {
      try {
        const response = await client.get(`/api/car_models`, {
          headers: {
            'Connection': 'keep-alive',
          }
        });
        console.log(response.data)
        return response.data;
      } catch (err: any) {
        throw rejectWithValue(err.response.data);
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
            state.carMakes = action.payload.car_makes;
          })
          .addCase(fetchAllCars.rejected, (state) => {
            state.status = RequestStatus.Failed;
          })
          .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<brandsWithModels[]>) => {
            state.brandsWithModels = action.payload;
          })
      },
});
// export const selectCarBrands = (state: RootState) => state.carFiltersAndResults.carMakes;
export const { setFilters } = carFiltersAndResultsSlice.actions;
export default carFiltersAndResultsSlice.reducer;
