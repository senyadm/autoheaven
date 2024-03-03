import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import carMakesReducer from "./Features/carMakesSlice";
import carFiltersAndResultsReducer from "./Features/carFiltersAndResultsSlice";
import transportCategoryReducer from "./Features/transportCategorySlice";
import profileNavigationMenuReducer from "./profile/profileNavigationMenuSlice";
import userReducer from "./profile/userSlice";
import profileReducer from "./profile/profileSlice";
import carCreationSlice from "./CreateCar/CreateCarSlice";

import { chatSlice } from "./profile/chatSlice";

export const store = configureStore({
  reducer: {
    carMakes: carMakesReducer,
    carFiltersAndResults: carFiltersAndResultsReducer,
    transportCategory: transportCategoryReducer,
    profileNavigationMenu: profileNavigationMenuReducer,
    user: userReducer,
    profile: profileReducer,
    createCarProgress: carCreationSlice,
    chats: chatSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
