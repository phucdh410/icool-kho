import { methods } from "../axios";

export const deXuatHangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/goods_suggestion", { params });
  },
  create: async (body) => {
    return await methods.post("/goods_suggestion/create", body);
  },
  getByCode: async (code) => {
    return await methods.get(`/goods_suggestion/getByCode/${code}`);
  },
  update: async (body) => {
    return await methods.post("/goods_suggestion/update", body);
  },
  delete: async (body) => {
    return await methods.post("/goods_suggestion/delete", body);
  },
};
