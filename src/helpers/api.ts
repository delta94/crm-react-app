import Axios from "axios";
import { useSelector } from "react-redux";
import { userSelector } from "store/auth/selectors";

export const API_URL = "https://run.mocky.io/v3/";

export const axios = Axios.create({ baseURL: API_URL });

export const useAxios = () => {
  const user = useSelector(userSelector);

  if (user.token !== null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  return;
};
