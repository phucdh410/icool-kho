import { methods } from "../axios";

export const comboApi = {
  getAll: async (params) => {
    return await methods.get("/combos", { params });
  },
  create: async (body) => {
    return await methods.post("/combo/proposals", body);
  },
};
