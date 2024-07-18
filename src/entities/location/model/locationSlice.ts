import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCityLS, getCountryLS } from "../lib/verify";
import { Location } from "./interfaces";

interface LocationState{
    city: string;
    country: string;
}

const initialState: LocationState = {
    city: "",
    country: "",
};

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        setLocation: (state, action: PayloadAction<Location>) => {
            state.city = action.payload.city;
            state.country = action.payload.country;
        }
    }});
export const { setCity, setCountry, setLocation } = locationSlice.actions;