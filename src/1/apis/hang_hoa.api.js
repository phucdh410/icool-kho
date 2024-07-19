import { methods } from "../axios";

export const hangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/goods", { params });
  },
  getMenuByGoodsCode: async (code) => {
    return await methods.get(`/goods/getMenuByGoodsCode/${code}`);
  },
  updateMenuByGoodsCode: async (code, body) => {
    return await methods.put(`/goods/updateMenuByGoodsCode/${code}`, body);
  },
};
