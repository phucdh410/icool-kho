import { methods } from "../axios";

export const phieuTraHangApi = {
  getAll: async (params) => {
    return await methods.get("/return-forms", { params });
  },
  create: async (body) => {
    return await methods.post("/return-forms", body);
  },
  getById: async (id) => {
    return await methods.get(`/return-forms/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/return-forms/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/return-forms/${id}`);
  },
};
