import { methods } from "../axios";

export const nhaCungCapApi = {
  createSuggest: async (body) => {
    return await methods.post("/suppliers", body);
  },
};
