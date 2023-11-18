import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientUsers } from "../client";
import { get } from "http";
import { getToken } from "../../../utils/auth";
import { AppDispatch } from "../store";
interface PPState {
  name: string;
  surname: string;
  phoneNumber: string;
}
interface CredentialsState {
  email: string;
  password: string;
}
interface ProfileState extends PPState, CredentialsState {
  confirmedPrivacy: boolean;
}
const initialState: ProfileState = {
  name: "",
  surname: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmedPrivacy: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPublicProfile: (state, action: PayloadAction<PPState>) => {
      const { name, surname, phoneNumber } = action.payload;
      state.name = name;
      state.surname = surname;
      state.phoneNumber = phoneNumber;
    },
  },
});

export const { setPublicProfile } = profileSlice.actions;

export default profileSlice.reducer;
