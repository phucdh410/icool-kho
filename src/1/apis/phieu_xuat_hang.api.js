import { methods } from "../axios";

export const phieuXuatHangApi = {
  getAll: async (params) => {
    return await methods.get("/export-forms", { params });
  },
  create: async (body) => {
    return await methods.post("/export-forms", body);
  },
  getById: async (id) => {
    return await methods.get(`/export-forms/getById/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/export-forms/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/export-forms/${id}`);
  },
};
