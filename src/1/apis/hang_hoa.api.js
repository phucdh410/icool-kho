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
  getByCode: async (code) => {
    return await methods.get(`/goods/${code}`);
  },
  updatePrice: async (code, body) => {
    return await methods.put(`/goods/updatePrice/${code}`, body);
  },
};
