import { methods } from "../axios";

export const tonKhoTucThoiApi = {
  getAll: async (params) => {
    return await methods.get("/inventory-check", { params });
  },
};
