import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { clientCars } from "../../../src/shared/api/client";
import { postVehicle } from "../../../src/features/create-vehicle/api/create-vehicle";

export interface CarDetails {
  type: string;
  body_type: string;
  color: string;
  year: number;
  mileage: number;
  gearbox: string;
  price: number;
  description: string;
  phone?: string;
  title: string;
  fueltype: string;
  accidentfree: boolean;
  imageurl: string;
  drivetrain: string;
  istop: boolean;
  vehicle_id: number;
  country_origin: string;
  cubic_capacity: string;
  horsepower: string;
  fuel_consumption: string;
  interior_color: string;
}

const defaultCarDetails = {
  type: "",
  body_type: "",
  color: "",
  year: new Date().getFullYear(),
  mileage: 0,
  gearbox: "",
  price: 0,
  description: "",
  fuel_consumption: "",
  horsepower: "",
  cubic_capacity: "",
  country_origin: "",
  interior_color: "",
  phone: "",
  vehicle_id: 0,
  title: "",
  fueltype: "",
  accidentfree: false,
  imageurl: "",
  drivetrain: "",
  istop: false,
};

interface CarCreationState {
  carType: string | null;
  brand: string | null;
  model: string | null;
  details: CarDetails;
  models: string[];
  wishlist: number[];
}

const initialState: CarCreationState = {
  carType: null,
  brand: null,
  model: null,
  details: defaultCarDetails,
  models: [],
  wishlist: [],
};

export async function createCar(
  params: CarCreationState,
  selectedFiles: FileList | null
): Promise<string> {
  const payload: Record<string, string | Blob | number> = {
    type: params.carType || "",
    body_type: params.details?.body_type || "",
    make: params.brand || "",
    model: params.model || "",
    color: params.details?.color || "",
    year: params.details?.year.toString(),
    mileage: params.details?.mileage.toString(),
    gearbox: params.details?.gearbox || "",
    price: params.details?.price.toString(),
    description: params.details?.description || "",
    phone: params.details?.phone || "",
    title: params.details?.title || "",
    fueltype: params.details?.fueltype || "",
    accidentfree: params.details?.accidentfree.toString(),
    imageurl: params.details?.imageurl || "",
    drivetrain: params.details?.drivetrain || "",
    istop: params.details?.istop.toString(),
    vehicle_id: params.details?.vehicle_id.toString(),
    country_origin: params.details?.country_origin || "",
    cubic_capacity: Number(params.details?.cubic_capacity) || 0,
    horsepower: params.details?.horsepower || "",
    fuel_consumption: params.details?.fuel_consumption || "",
    interior_color: params.details?.interior_color || "",
  };

  const formData = new FormData();

  Object.keys(payload).forEach((key: any) => {
    formData.append(key, payload[key]);
  });

  if (selectedFiles) {
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i], selectedFiles[i].name);
    }
  }

  postVehicle(payload, params.carType);
}

export async function uploadImage(id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await clientCars.post(`api/cars/upload/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function getIntent(id: string, option: string) {
  const url = `api/create-payment-intent/${option}/${id}`;
  try {
    const response = await clientCars.post(url);
    return response.data.client_secret;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

// export const addToWishListThunk = createAsyncThunk(
//   'carCreation/addToWishList',
//   async (id: number, { dispatch, getState }) => {
//     const token = getToken();
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };

//     try {
//       const response = await clientCars.post(`/api/cars/wishlist?car_id=${id}`, { headers });

//       return response.data;
//     } catch (err: any) {
//       // You can also dispatch error handling actions here if needed
//       return err.response.data;
//     }
//   }
// );

export const carCreationSlice = createSlice({
  name: "carCreation",
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
      state.details = defaultCarDetails;
    },
    // addToWishlist: (state, action: PayloadAction<number>) => {
    //   if (!state.wishlist.includes(action.payload)) {
    //     state.wishlist = [...state.wishlist, action.payload];
    //   }
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchWishlistCars.fulfilled, (state, action) => {
    //   state.wishlist = action.payload;
    // })
    // .addCase(addToWishListThunk.fulfilled, (state, action) => {
    //   if (!state.wishlist.includes(action.meta.arg)) {
    //     state.wishlist = action.payload;
    //   }
    // });
  },
});

// Export actions
export const {
  setCarType,
  setBrand,
  setModel,
  setModels,
  setDetails,
  resetSelections,
} = carCreationSlice.actions;
// Export reducer
export default carCreationSlice.reducer;
