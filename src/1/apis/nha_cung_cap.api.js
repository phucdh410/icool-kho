import { methods } from "../axios";

export const nhaCungCapApi = {
  createSuggest: async (body) => {
    return await methods.post("/suppliers", body);
  },
  getAllSuggest: async (params) => {
    return await methods.get("/suppliers", { params });
  },
  getDetailSuggest: async (id) => {
    return await methods.get(`/suppliers/${id}`);
  },
  updateSuggest: async (id, body) => {
    return await methods.put(`/suppliers/${id}`, body);
  },
  removeSuggest: async (id) => {
    return await methods.delete(`/suppliers/${id}`);
  },
};
