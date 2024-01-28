import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientCars, clientChats, clientUsers } from "../client";
import { get } from "http";
import { getToken } from "../../../utils/auth";
import { AppDispatch } from "../store";
import { Car } from "../../../interfaces/shared/Car";

export interface ChatList {
  recipients: number[]
  last_messages: Record<string, string>
}

export interface ChatMessage {
  id: number
  sender_id: number
  receiver_id: number
  content: string
  timestamp: string
}

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
  currentChatMessages: ChatMessage[];
  cars: Car[];
  currentChatID: number;
  chats: ChatList;
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
  currentChatID: 0,
  currentChatMessages: [],
  chats: {
    recipients: [],
    last_messages: {
      "0": "Hello"
    }
  },
  username: "",
  loadState: "idle",
  wishlist: [],
  cars: [],
  isLoggedIn: false,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentChathistory: (state, action: PayloadAction<ChatMessage[]>) => {
      state.currentChatMessages = action.payload;
    },
    setCurrentChatID: (state, action: PayloadAction<number>) => {
      state.currentChatID = action.payload;
    },
    setChats: (state, action: PayloadAction<ChatList>) => {
      state.chats = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      for (const key in action.payload) {
        state[key] = action.payload[key];
      }
      state.isLoggedIn = true;
    },
    addToWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist.push(action.payload);
    },
    deleteFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter((id) => id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<number[]>) => {
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
      const response = await clientCars.delete(`/api/cars/wishlist/${id}`);

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
      dispatch(
        setWishlist(response.data.map((car: any) => car.id) as number[])
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
      const response = await clientCars.get("/api/cars/user/");
      dispatch(setCars(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user cars:", error);
      throw error;
    }
  }
);

export const fetchUserChats = createAsyncThunk(
  "user/fetchUserChats",
  async (_, { dispatch }) => {
    try {
      const token = getToken();
      const response = await clientChats.get(`/chat_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setChats(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
      throw error;
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "user/fetchUserChats",
  async (receiver_id: string, { dispatch }) => {
    try {
      const token = getToken();
      const response = await clientChats.get(`/chat_history/${receiver_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCurrentChathistory(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching user chats:", error);
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
  setChats,
  setCurrentChathistory,
  setCurrentChatID
} = userSlice.actions;

export default userSlice.reducer;
