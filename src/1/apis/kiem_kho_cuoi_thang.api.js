import { methods } from "../axios";

export const kiemKhoCuoiThangApi = {
  getAll: async (params) => {
    return await methods.get("/inventory_slips", { params });
  },
};
