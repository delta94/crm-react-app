import { RootState } from "MyTypes";

export const userSelector = (state: RootState) => state.auth;

export const isAuthenticatedSelector = (state: RootState) => !!state.auth.token;
