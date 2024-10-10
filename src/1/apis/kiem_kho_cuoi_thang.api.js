import { methods } from "../axios";

export const kiemKhoCuoiThangApi = {
  getAll: async (params) => {
    return await methods.get("/inventory-check", { params });
  },
  create: async (body) => {
    return await methods.post("/inventory-check", body);
  },
  getById: async (id) => {
    return await methods.get(`/inventory-check/getById/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/inventory-check/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/inventory-check/${id}`);
  },
  approve: async (id) => {
    return await methods.put(`/inventory-check/${id}/approve`);
  },
  getMaterials: async (params) => {
    return await methods.get("/inventory-check/getMaterial", { params });
  },
};
