import { methods } from "../axios";

export const deXuatHangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/goods_suggestion", { params });
  },
  create: async (body) => {
    return await methods.post("/goods_suggestion/create", body);
  },
  // getNganhHang: async () => {
  //   return await methods.get("/goods/industries");
  // },
  delete: async (body) => {
    return await methods.post("/goods_suggestion/delete", body);
  },
};
