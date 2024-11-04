import axios from "axios";
import dayjs, { isDayjs } from "dayjs";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.params) {
      Object.keys(req.params).forEach((key) => {
        if (req.params[key] instanceof Date || isDayjs(req.params[key])) {
          req.params[key] = dayjs(req.params[key]).format("YYYY-MM-DD");
        }
        if (
          req.params[key] === "all" ||
          req.params[key] === "" ||
          typeof req.params[key] === "undefined"
        ) {
          delete req.params[key];
        }
      });
    }
    if (req.method === "post" || req.method === "put") {
      if (req.data && !(req.data instanceof FormData)) {
        for (let [key, value] of Object.entries(req.data)) {
          if (
            key.includes("file") &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            req.data[key] = value?.id;
          }
          if (key.includes("date")) {
            req.data[key] = dayjs(value).format("YYYY-MM-DD");
          }
        }
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // console.log(error?.response);

    const errorData = error?.response?.data;

    return Promise.reject({ ...errorData });
  }
);

export const methods = {
  get: async (url, options = {}) => {
    try {
      return await axiosInstance.get(url, { ...options });
    } catch (error) {
      throw error;
    }
  },
  post: async (url, body, options = {}) => {
    try {
      return await axiosInstance.post(url, body, { ...options });
    } catch (error) {
      throw error;
    }
  },
  put: async (url, body, options = {}) => {
    try {
      return await axiosInstance.put(url, body, { ...options });
    } catch (error) {
      throw error;
    }
  },
  delete: async (url, options = {}) => {
    try {
      return await axiosInstance.delete(url, { ...options });
    } catch (error) {
      throw error;
    }
  },
};
