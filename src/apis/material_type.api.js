import fileDownload from "js-file-download";

import {
  _delete,
  FORM_HEADER_ENCODED,
  get,
  map,
  post,
  put,
} from "src/utils/axios";

import { MATERIAL_TYPE } from "./_constants";

export const getAllMaterialTypes = async (params) =>
  await map(({ data }) => data).get(MATERIAL_TYPE.getAll, { params });

export const createMaterialType = async (body) => {
  return await post(MATERIAL_TYPE.create, body, FORM_HEADER_ENCODED);
};

export const updateMaterialType = async (body) => {
  return await post(MATERIAL_TYPE.update, body, FORM_HEADER_ENCODED);
};

export const removeMaterialType = async (codes) => {
  const params = new URLSearchParams();
  params.append("listCode", codes.join(","));
  return await post(MATERIAL_TYPE.delete, params, FORM_HEADER_ENCODED);
};

export const exportExcelMaterialType = async (params) => {
  get(MATERIAL_TYPE.exportExcel, {
    params,
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    return fileDownload(res.data, "report.xlsx");
  });
};
