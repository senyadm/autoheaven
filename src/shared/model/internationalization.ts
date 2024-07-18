import { PageData } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DictState{
    dict: PageData | null;
    
}

const initialState: DictState = {
    dict: null
};

export const dictSlice = createSlice({
  name: "dict",
  initialState,
  reducers: {
    setDict: (state, action: PayloadAction<PageData>) => {
      state.dict = action.payload;
    },
  },
});

// Export actions
export const { setDict } = dictSlice.actions;
// Export reducer
export default dictSlice.reducer;
