import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientCars, clientUsers } from "../client";
import { get } from "http";
import { getToken } from "../../../utils/auth";
import { AppDispatch } from "../store";

interface UserInfo {
  address: string;
  city: string;
  country: string;
  id: number;
  name: string;
  phone_number: string;
  region: string | null;
  surname: string;
}
type LoadState = "idle" | "loading" | "succeeded" | "failed";

interface UserState {
  email: string;
  id: number;
  is_active: boolean;
  password: string;
  user_group: string | null;
  user_info: UserInfo | null;
  user_info_id: number;
  username: string;
  loadState: LoadState; // for async
  wishlist: number[];
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
  wishlist: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("setUser executed", action.payload);
      return action.payload;
    },
    addToWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist.push(action.payload);
    },
    deleteFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<number[]>) => {
      state.wishlist = action.payload;
    }
  },
});

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch }) => {
    try {
      const token = getToken();
      // Assume that the token is valid
      const response = await clientUsers.get("/api/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  async (id: number, { dispatch }) => {
    try {
      const response = await clientCars.post(
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
  async (id: number, { dispatch }) => {
    try {
      const response = await clientCars.delete(
        `/api/cars/wishlist/${id}`,
    
      );

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
      const response = await clientCars.get("/api/cars/wishlist/");
      dispatch(setWishlist(response.data.map((car: any) => car.id) as number[]) );
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist cars:", error);
      throw error;
    }
  }
);

export const { setUser, addToWishlist, deleteFromWishlist, setWishlist } = userSlice.actions;

export default userSlice.reducer;
