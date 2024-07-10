import { methods } from "../axios";

export const menuApi = {
  getAll: async (params) => {
    return await methods.get("/menu", { params });
  },
  create: async (body) => {
    return await methods.post("/menu", body);
  },
  update: async (code, body) => {
    return await methods.put(`/menu/${code}`, body);
  },
  remove: async (code) => {
    return await methods.delete(`/menu/${code}`);
  },
};
