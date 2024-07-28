import { Locale } from "@/src/app/i18n.config";
import { PageData } from "@/src/shared/types/page-data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PageParams {
  lang: Locale;
  productId?: number;
  slug?: string[];
}

interface PageDataState{
    dict: PageData | null;
    params: PageParams | null;
}

const initialState: PageDataState = {
  dict: null,
  params: null,
};

export const pageDataSlice = createSlice({
  name: "pageData",
  initialState,
  reducers: {
    setDict: (state, action: PayloadAction<PageData>) => {
      state.dict = action.payload;
    },
    setParams: (state, action: PayloadAction<any>) => {
      state.params = action.payload;
    }
  },
});

// Export actions
export const { setDict, setParams } = pageDataSlice.actions;
// Export reducer
export default pageDataSlice.reducer;
