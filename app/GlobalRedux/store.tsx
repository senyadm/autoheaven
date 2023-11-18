import { configureStore } from '@reduxjs/toolkit';
import carMakesReducer from './Features/carMakesSlice';
import carFiltersAndResultsReducer from './Features/carFiltersAndResultsSlice';
import transportCategoryReducer from './Features/transportCategorySlice';
import profileNavigationMenuReducer from './profile/profileNavigationMenuSlice';
import carCreationSlice from './CreateCar/CreateCarSlice';

export const store = configureStore({
  reducer: {
    carMakes: carMakesReducer,
    carFiltersAndResults: carFiltersAndResultsReducer,
    transportCategory: transportCategoryReducer,
    profileNavigationMenu: profileNavigationMenuReducer,
    createCarProgress: carCreationSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;