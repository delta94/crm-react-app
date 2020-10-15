import Axios from "axios";

export const API_URL = "https://5f7ebbb0094b670016b76686.mockapi.io";

export const axios = Axios.create({ baseURL: API_URL }) as typeof Axios;
