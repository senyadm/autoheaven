import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clientCars, clientEmail } from "../client";
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

export async function sendEmail(email: unknown): Promise<string> {

  const payload = {
    "to": [
      email
    ],
    "subject": "string",
    "body": "string"
  }
  try {
    const response = await clientEmail.post("/send_mail", payload,);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
}


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
    setCredentials: (state, action: PayloadAction<CredentialsState>) => {
      const { email, password } = action.payload;
      if(email) state.email = email;
      if(password) state.password = password;
    }
  },
});

export const { setPublicProfile, setCredentials } = profileSlice.actions;

export default profileSlice.reducer;
