import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sleep } from "helpers/sleep";

export const login = createAsyncThunk<
  { token: string },
  { username: string; password: string }
>("auth/login", async ({ username, password }) => {
  // const res = await axios.post("http://localhost:8081/api/authenticate", {
  //   username,
  //   password,
  // });

  // return res.data;
  return {
    token: "asdas",
  };
});
