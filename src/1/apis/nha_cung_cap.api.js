import { methods } from "../axios";

export const nhaCungCapApi = {
  getAll: async (params) => {
    return await methods.get("/suppliers", { params });
  },
};
