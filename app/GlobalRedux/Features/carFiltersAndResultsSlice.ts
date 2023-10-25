import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { clientCars } from "../client";

enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Failed = "failed",
}

export type CarResult = {
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
  filteredCars: CarResult[];
  status: RequestStatus;
  carMakes: string[];
  brandsWithModels: brandsWithModels;
};

export type brandsWithModels = {
  [brand: string]: string[];
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
  filteredCars: [],
  carMakes: [],
  brandsWithModels: {},
  status: RequestStatus.Idle,
};

interface Car {
  id: number;
  type: string;
  make: string;
  model: string;
  color: string;
  year: number;
  mileage: number;
  price: number;
  description: string;
  seller_id: number;
  created_at: string;
}

export interface FiltersResponse {
  meta: Record<string, string>
  payload: CarResult[]
  type: string
}

export const fetchAllCarMakes = createAsyncThunk(
  "carFiltersAndResults/fetchAllCarMakes ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clientCars.get("/api/car_makes");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchBrands = createAsyncThunk(
  "carFiltersAndResults/fetchBrands",
  async (_, { rejectWithValue }): Promise<brandsWithModels> => {
    try {
      const response = await clientCars.get(`/api/car_models`, {
        timeout: 15000, 
      });
      return response.data;
    } catch (err: any) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllCars = createAsyncThunk(
  "carFiltersAndResults/fetchAllCars",
  async (filters: string, { rejectWithValue }): Promise<FiltersResponse> => {
    try {
      const response = await clientCars.get(`/api/cars/fetch`, {
        timeout: 10000,
        params: {
          max_results: 10000
        }
      });
      console.log(response.data);
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
      const response = await clientCars.post("/api/token", {
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
  name: "carFiltersAndResults",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarMakes.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(
        fetchAllCarMakes.fulfilled,
        (state, action: PayloadAction<{ car_makes: string[] }>) => {
          state.status = RequestStatus.Idle;
          state.carMakes = action.payload.car_makes;
        }
      )
      .addCase(fetchAllCarMakes.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<brandsWithModels>) => {
          state.brandsWithModels = action.payload;
        }
      )
      .addCase(fetchAllCars.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllCars.fulfilled, (state, action: PayloadAction<FiltersResponse>) => {
        state.status = RequestStatus.Idle;
        state.filteredCars = action.payload.payload;
      })
  },
});
// export const selectCarBrands = (state: RootState) => state.carFiltersAndResults.carMakes;
export default carFiltersAndResultsSlice.reducer;
