import { methods } from "../axios";

export const phieuChamDiemNCCApi = {
  create: async (body) => {
    return await methods.post("/suppliers", body);
  },
  getAll: async (params) => {
    return await methods.get("/suppliers/supplierEvaluations", { params });
  },
  getById: async (id) => {
    return await methods.get(`/suppliers/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/suppliers/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/suppliers/${id}`);
  },
  getSupplierById: async (id) => {
    return await methods.get(`/suppliers/getBySupplier/${id}`);
  },
  updateSupplier: async (id, body) => {
    return await methods.put(`/suppliers/supplier/${id}`, body);
  },
};
