import { methods } from "../axios";

export const nhomNguyenVatLieuApi = {
  getAll: async () => {
    return methods.get("/material_groups/search");
  },
};
