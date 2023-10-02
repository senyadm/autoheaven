import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface profileNavigationMenuState {
  menuItemName: menuItemType

};

const initialState: profileNavigationMenuState = {
  menuItemName: "overview"
};

export const profileNavigationMenuSlice = createSlice({
  name: "profileNavigationMenu",
  initialState,
  reducers: {
    setProfileNavigationMenuItemName: (state, action: PayloadAction<menuItemType>) => {
      state.menuItemName = action.payload;
    },
  },
});

export const { setProfileNavigationMenuItemName } =
  profileNavigationMenuSlice.actions;

export default profileNavigationMenuSlice.reducer;
