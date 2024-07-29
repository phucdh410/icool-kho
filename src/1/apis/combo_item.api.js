import { methods } from "../axios";

export const comboItemApi = {
  getAll: async () => {
    return await methods.get("/combo-items");
  },
  create: async (body) => {
    return await methods.post("/combo-items");
  },
  update: async (id, body) => {
    return await methods.put(`/combo-items/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/combo-items/${id}`);
  },
};
