import axios from "axios";
import dayjs from "dayjs";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.params) {
      Object.keys(req.params).forEach((key) => {
        if (req.params[key] instanceof Date) {
          req.params[key] = dayjs(req.params[key]).format("YYYY-MM-DD");
        }
        if (req.params[key] === "all") {
          delete req.params[key];
        }
      });
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export const methods = {
  get: async (url, options = {}) => {
    try {
      return await axiosInstance.get(url, { ...options });
    } catch (error) {
      throw error;
    }
  },
};
