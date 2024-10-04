import { methods } from "../axios";

export const phieuXuatHangApi = {
  getAll: async (params) => {
    return await methods.get("/delivery-forms", { params });
  },
  create: async (body) => {
    return await methods.post("/delivery-forms", body);
  },
  getById: async (id) => {
    return await methods.get(`/delivery-forms/getById/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/delivery-forms/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/delivery-forms/${id}`);
  },
};
