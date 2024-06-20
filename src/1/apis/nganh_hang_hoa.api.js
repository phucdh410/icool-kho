import { FORM_HEADER_ENCODED } from "src/utils/axios";
import { methods } from "../axios";
import fileDownload from "js-file-download";

export const nganhHangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/industry_goods", { params });
  },
  create: async (body) => {
    return await methods.post("/industry_goods/create", body);
  },
  update: async (body) => {
    return await methods.post("/industry_goods/update", body);
  },
  remove: async (body) => {
    return await methods.post("/industry_goods/delete", body);
  },
  exportExcel: async (params) => {
    methods
      .get("/industry_goods/export", {
        params,
        responseType: "blob",
        headers: FORM_HEADER_ENCODED,
      })
      .then((res) => {
        return fileDownload(res.data, "report.xlsx");
      })
      .catch((error) => {
        throw error;
      });
  },
};
