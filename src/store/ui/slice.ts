import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, Menus } from "MyTypes";
import { getLanguage, getMenus } from "./thunks";

const initialState = {
  language: "ru",
  isMenuOpen: true,
  menus: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      const { language } = action.payload;
      state.language = language;
    },
    toggleMenu(state, action: PayloadAction<boolean>) {
      state.isMenuOpen =
        action.payload !== undefined ? action.payload : !state.isMenuOpen;
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

export const { setLanguage, toggleMenu } = uiSlice.actions;

export default uiSlice.reducer;
