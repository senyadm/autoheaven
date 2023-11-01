import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { clientCars } from "../client";
import { object } from "zod";

enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Failed = "failed",
}
type FuelType = "petrol" | "electric";
type Drivetrain = "fwd" | "awd" | "rwd";
type BodyStyle = "sedan" | "suv";
type Gear = "automatic" | "manual";
type PageDisplayed = "cars" | "profileCars" | "profileAds";


export type CarResult = {
  id: number;
  make: string;
  color: string;
  mileage: number;
  body_type: BodyStyle;
  price: number;
  seller_id: number;
  title: string | null;
  accidentfree: boolean | null;
  imageurl: string;
  istop: boolean | null;
  model: string;
  type: string;
  year: number;
  gearbox: Gear;
  description: string;
  created_at: string;
  fueltype: FuelType;
  drivetrain: Drivetrain;
};

type CarState = {
  filteredCars: CarResult[][];
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

export interface FilterPayload {
  max_results: number
  type?: string
  make?: string
  model?: string
  fueltype?: string
  body_type?: string
  price_max: number
  price_min: number 
  min_year: number
  max_year: number
  mileage_min: number 
  mileage_max: number  
  accidentfree?: boolean
  drivetrain?: string
  istop?: boolean
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
        timeout: 20000, 
      });
      return response.data;
    } catch (err: any) {
      throw rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllCars = createAsyncThunk(
  "carFiltersAndResults/fetchAllCars",
  async (filters: FilterPayload, { rejectWithValue }): Promise<Record<string, CarResult[]>> => {
    try {
      if (Object.keys(filters).length === 0) return {};
      console.log("FILTERS IN BACK", filters)
      Object.entries(filters).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          delete filters[key as keyof typeof filters];
        }
      });
      const response = await clientCars.get(`/api/cars/fetch`, {
        params: filters
      });
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
      .addCase(fetchBrands.pending, (state) => {
        state.status = RequestStatus.Loading;
        })
      .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<brandsWithModels>) => {
        state.status = RequestStatus.Idle;
        state.brandsWithModels = action.payload;
      })
      .addCase(fetchAllCars.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllCars.fulfilled, (state, action: PayloadAction<Record<string, CarResult[]>>) => {
        state.status = RequestStatus.Idle;
        const res = Object.values(action.payload)
        console.log(res)
        state.filteredCars = res;
      })
  },
});
// export const selectCarBrands = (state: RootState) => state.carFiltersAndResults.carMakes;
export default carFiltersAndResultsSlice.reducer;
