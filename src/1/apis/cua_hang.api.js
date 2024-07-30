import { methods } from "../axios";

export const cuaHangApi = {
  getAll: async () => {
    return await methods.get("/stores");
  },
  getMyStore: async () => {
    return await methods.get("/stores/getMyStore");
  },
};
