import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientUsers } from "../client";
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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      console.log("setUser executed", action.payload);
      return action.payload;
    },
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

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
