import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface UserState {
  email: string;
  id: number;
  is_active: boolean;
  password: string;
  user_group: string | null;
  user_info: UserInfo | null;
  user_info_id: number;
  username: string;
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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
