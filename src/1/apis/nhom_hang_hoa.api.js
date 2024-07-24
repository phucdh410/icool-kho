import fileDownload from "js-file-download";

import { FORM_HEADER_ENCODED } from "src/utils/axios";

import { methods } from "../axios";

export const nhomHangHoaApi = {
  getAll: async (params) => {
    return await methods.get("/group_goods", { params });
  },
  create: async (body) => {
    return await methods.post("/group_goods/create", body);
  },
  update: async (body) => {
    return await methods.post("/group_goods/update", body);
  },
  remove: async (body) => {
    return await methods.post("/group_goods/delete", body);
  },
  exportExcel: async (params) => {
    methods
      .get("/group_goods/export", {
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
