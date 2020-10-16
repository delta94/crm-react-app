import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "MyTypes";
import { FLUSH } from "store/actionTypes";
import { login } from "./thunks";

const initialState: User = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { token } = action.payload;
      state.token = token;
    },
  },
  extraReducers: {
    [FLUSH]: (state) => {
      state.token = null;
    },
    [login.fulfilled.toString()]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
