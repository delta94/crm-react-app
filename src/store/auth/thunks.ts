import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "helpers/api";

export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string }
>("auth/login", async ({ username, password }) => {
  const res = await axios.post("/api/authenticate", {
    username,
    password,
  });

  return res.data;
});
