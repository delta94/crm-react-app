import Axios from "axios";
import { useSelector } from "react-redux";
import { userSelector } from "store/auth/selectors";

// export const API_URL = "https://5f7ebbb0094b670016b76686.mockapi.io";
export const API_URL = "http://localhost:8081";

export const axios = Axios.create({ baseURL: API_URL });

export const useAxios = () => {
  const user = useSelector(userSelector);

  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  return;
};
