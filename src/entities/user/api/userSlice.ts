import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientCars, clientCarsForceAuth, clientUsers } from "../../../shared/api/client";
import { Car } from "../../../../interfaces/shared/Car";
import { UserAPI } from "../../../../interfaces/shared/users";

type LoadState = "idle" | "loading" | "succeeded" | "failed";

export interface UserState extends UserAPI {
  loadState: LoadState; // for async
  wishlist: (number | string)[] | null;
  cars: Car[] | null;

  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: "",
  id: 0,
  is_active: true,
  password: "",
  user_group: null,
  user_info: null,
  user_info_id: 0,
  username: "",
  loadState: "idle",
  wishlist: null,
  cars: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserAPI>) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state = initialState;
    },
    addToWishlist: (state, action: PayloadAction<(number | string)>) => {
      state.wishlist.push(action.payload);
    },
    deleteFromWishlist: (state, action: PayloadAction<(number | string)>) => {
      state.wishlist = state.wishlist?.filter((id) => id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<(number | string)[]>) => {
      state.wishlist = action.payload;
    },
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
  },
});

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch }) => {
    try {
      // Assume that the token is valid
      const response = await clientUsers.get("/api/users/me/");

      dispatch(setUser(response.data));

      // Return the data if needed
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Dispatch an action to handle the error, e.g., set an error state
      // dispatch(setError(error.message));
      throw error; // Rethrow the error if needed
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  "user/addToWishlist",
  async (id: (number | string), { dispatch }) => {
    try {
      const response = await clientCarsForceAuth.post(
        `/api/cars/wishlist?car_id=${id}`,
        {
          car_id: id,
        }
      );

      dispatch(addToWishlist(id));

      return response.data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      throw error;
    }
  }
);

export const deleteFromWishlistThunk = createAsyncThunk(
  "user/deleteFromWishlist",
  async (id: (number | string), { dispatch }) => {
    try {
      const response = await clientCarsForceAuth.delete(`/api/cars/wishlist/${id}`);

      dispatch(deleteFromWishlist(id));

      return response.data;
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
      throw error;
    }
  }
);

export const fetchWishlistCars = createAsyncThunk(
  "user/fetchWishlistCars",
  async (_, { dispatch }) => {
    try {
      const response = await clientCarsForceAuth.get("/api/cars/wishlist/");
      dispatch(
        setWishlist(response.data.map((car: any) => car.id) as (number | string)[])
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist cars:", error);
      throw error;
    }
  }
);

export const fetchUserCars = createAsyncThunk(
  "user/fetchUserCars",
  async (_, { dispatch }) => {
    try {
      const response = await clientCarsForceAuth.get("/api/cars/user/");
      dispatch(setCars(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user cars:", error);
      throw error;
    }
  }
);

export const {
  setUser,
  addToWishlist,
  deleteFromWishlist,
  setWishlist,
  setCars,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
