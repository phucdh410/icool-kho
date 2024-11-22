import { methods } from "../axios";

export const kiemKhoApi = {
  getAll: async (params) => {
    return await methods.get("/inventory-check", { params });
  },
};
