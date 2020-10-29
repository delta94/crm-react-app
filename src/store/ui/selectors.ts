import { RootState } from "MyTypes";

export const uiSelector = (state: RootState) => state.ui;

export const isMenuOpenSelector = (state: RootState) => state.ui.isMenuOpen;
