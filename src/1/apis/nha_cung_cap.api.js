import { methods } from "../axios";

export const nhaCungCapApi = {
  createSuggest: async (body) => {
    return await methods.post("/supplier-proposals", body);
  },
  getAllSuggest: async (params) => {
    return await methods.get("/supplier-proposals", { params });
  },
  getDetailSuggest: async (id) => {
    return await methods.get(`/supplier-proposals/${id}`);
  },
  updateSuggest: async (id, body) => {
    return await methods.put(`/supplier-proposals/${id}`, body);
  },
  removeSuggest: async (id) => {
    return await methods.delete(`/supplier-proposals/${id}`);
  },
  getDetailSupplier: async (id) => {
    return await methods.get(`/supplier-proposals/getByProposalSupplier/${id}`);
  },
  updateDetailSupplier: async (id, body) => {
    return await methods.put(
      `/supplier-proposals/proposalSupplier/${id}`,
      body
    );
  },
};
