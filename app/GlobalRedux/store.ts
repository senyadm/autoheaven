import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import carMakesReducer from "./Features/carMakesSlice";
import carFiltersAndResultsReducer from "./Features/carFiltersAndResultsSlice";
import transportCategoryReducer from "./Features/transportCategorySlice";
import profileNavigationMenuReducer from "./profile/profileNavigationMenuSlice";
import userReducer from "../../src/entities/user/api/userSlice";
import profileReducer from "./profile/profileSlice";
import carCreationSlice from "./CreateCar/CreateCarSlice";

import { chatSlice } from "./profile/chatSlice";
import { combineReducers, createStore } from "redux";
import { pageDataSlice } from "@/src/shared/model/page-data";
import { locationSlice } from "@/src/entities/location";

const rootReducer = combineReducers({
  carMakes: carMakesReducer,
  carFiltersAndResults: carFiltersAndResultsReducer,
  transportCategory: transportCategoryReducer,
  profileNavigationMenu: profileNavigationMenuReducer,
  user: userReducer,
  profile: profileReducer,
  createCarProgress: carCreationSlice,
  chats: chatSlice.reducer,
  pageData: pageDataSlice.reducer,
  location: locationSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({ reducer: persistedReducer });
// const persistor = persistStore(store);
// export { store, persistor };

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
