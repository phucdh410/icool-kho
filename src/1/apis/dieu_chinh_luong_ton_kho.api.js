import { methods } from "../axios";

export const dieuChinhLuongTonKho = {
  getALl: async (params) => {
    return await methods.get("/adjustment-forms", { params });
  },
  create: async (body) => {
    return await methods.post("/adjustment-forms", body);
  },
  getById: async (id) => {
    return await methods.get(`/adjustment-forms/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/adjustment-forms/${id}`, body);
  },
  remove: async (id) => {
    return await methods.delete(`/adjustment-forms/${id}`);
  },
};
