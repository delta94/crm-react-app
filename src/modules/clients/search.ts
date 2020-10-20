import axios, { AxiosRequestConfig } from "axios";
const makeRequestCreator = () => {
  let cancel;

  return async (query, options?: AxiosRequestConfig) => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
      const res = await axios(query, { ...options, cancelToken: cancel.token });

      const result = res;
      // Store response
      // resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log("Request canceled", error.message);
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message);
      }
    }
  };
};

export const search = makeRequestCreator();
