import { methods } from "../axios";

export const khoApi = {
  getAll: async () => {
    return await methods.get("/warehouses/getMyWarehouse");
  },
};
