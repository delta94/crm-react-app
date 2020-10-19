import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, Menus } from "MyTypes";
import { getLanguage, getMenus } from "./thunks";

const initialState = {
  language: "ru",
  menus: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      const { language } = action.payload;
      state.language = language;
    },
  },
  extraReducers: {
    [getLanguage.fulfilled.toString()]: (state, action) => {
      const { language } = action.payload;
      state.language = language;
    },
    [getMenus.fulfilled.toString()]: (state, action: PayloadAction<Menus>) => {
      const { data } = action.payload;
      state.menus = data;
    },
  },
});

export const { setLanguage } = uiSlice.actions;

export default uiSlice.reducer;
