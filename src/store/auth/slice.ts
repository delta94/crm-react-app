import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "MyTypes";
import { FLUSH } from "store/actionTypes";

const initialState: User = {
  isPending: true,
  uid: null,
  email: null,
  emailVerified: null,
  name: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const {
        uid,
        emailVerified,
        email,
        isPending,
        name,
        photoURL,
      } = action.payload;

      state.isPending = isPending;
      state.uid = uid;
      state.email = email;
      state.emailVerified = emailVerified;
      state.name = name;
      state.photoURL = photoURL;
    },
  },
  extraReducers: {
    [FLUSH]: (state) => {
      state.isPending = false;
      state.uid = null;
      state.email = null;
      state.emailVerified = null;
      state.name = null;
      state.photoURL = null;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
