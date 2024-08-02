import { methods } from "../axios";

export const deXuatNhaCungCapApi = {
  create: async (body) => {
    return await methods.post("/supplier-proposals", body);
  },
  getAll: async (params) => {
    return await methods.get("/supplier-proposals", { params });
  },
  getById: async (id) => {
    return await methods.get(`/supplier-proposals/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/supplier-proposals/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/supplier-proposals/${id}`);
  },
  getSupplierById: async (id) => {
    return await methods.get(`/supplier-proposals/getByProposalSupplier/${id}`);
  },
  updateSupplier: async (id, body) => {
    return await methods.put(
      `/supplier-proposals/proposalSupplier/${id}`,
      body
    );
  },
};
