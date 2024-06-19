import { methods } from "../axios";

export const nguyenVatLieuApi = {
  getAll: async (params) => {
    return await methods.get("/materials", { params });
  },
};
