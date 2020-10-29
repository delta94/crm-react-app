import { createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "helpers/api";

export const getLanguage = createAsyncThunk(
  "ui/language",
  async (id: string) => {
    const res = await axios.get(`/api/nls/${id}`);

    return res.data;
  }
);

export const getMenus = createAsyncThunk("ui/menus", async () => {
  const res = await axios.get("/api/menus");

  return res;
});
