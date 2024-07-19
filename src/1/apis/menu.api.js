import { methods } from "../axios";

export const menuApi = {
  getAll: async (params) => {
    return await methods.get("/menu", { params });
  },
  create: async (body) => {
    return await methods.post("/menu", body);
  },
  update: async (id, body) => {
    return await methods.put(`/menu/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/menu/${id}`);
  },
  getById: async (id) => {
    return await methods.get(`/menu/getById/${id}`);
  },
  updateGoodsToMenu: async (id, body) => {
    return await methods.put(`/menu/updateGoods/${id}`, body);
  },
  getGoodsInMenu: async (id) => {
    return await methods.get(`/menu/getGoodsById/${id}`);
  },
};
