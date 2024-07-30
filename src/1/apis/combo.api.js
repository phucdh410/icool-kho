import { methods } from "../axios";

export const comboApi = {
  getAll: async (params) => {
    return await methods.get("/combos", { params });
  },
};
