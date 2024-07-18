import { methods } from "../axios";

export const hangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/goods", { params });
  },
};
