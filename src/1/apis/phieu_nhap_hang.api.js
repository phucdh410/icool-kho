import { methods } from "../axios";

export const phieuNhapHangApi = {
  getAll: async (params) => {
    return await methods.get("/purchase-forms", { params });
  },
  create: async (body) => {
    return await methods.post("/purchase-forms", body);
  },
  getById: async (id) => {
    return await methods.get(`/purchase-forms/getById/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/purchase-forms/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/purchase-forms/${id}`);
  },
};
