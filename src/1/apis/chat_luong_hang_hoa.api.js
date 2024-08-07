import { methods } from "../axios";

export const chatLuongHangHoaApi = {
  create: async (body) => {
    return await methods.post("/goods-quality", body);
  },
  getAll: async (params) => {
    return await methods.get("/goods-quality/supplierEvaluations", { params });
  },
  getById: async (id) => {
    return await methods.get(`/goods-quality/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/goods-quality/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/goods-quality/${id}`);
  },
  getSupplierById: async (id) => {
    return await methods.get(`/goods-quality/getBySupplier/${id}`);
  },
  updateSupplier: async (id, body) => {
    return await methods.put(`/goods-quality/supplier/${id}`, body);
  },
};
