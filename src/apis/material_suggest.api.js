import { map, post, FORM_HEADER_ENCODED, _delete, get } from "src/utils/axios";

import { MATERIAL_SUGGEST } from "./_constants";
import fileDownload from "js-file-download";

export const getAllMaterialSuggests = async (params) =>
  await map(({ data }) => data).get(MATERIAL_SUGGEST.getAll, { params });

export const createMaterialSuggest = async (body) => {
  return await post(MATERIAL_SUGGEST.create, body, FORM_HEADER_ENCODED);
};

export const updateMaterialSuggest = async (body) => {
  return await post(MATERIAL_SUGGEST.update, body, FORM_HEADER_ENCODED);
};

export const removeMaterialSuggest = async (codes) => {
  const params = new URLSearchParams();
  params.append("listCode", codes.join(","));
  return await post(MATERIAL_SUGGEST.delete, params, FORM_HEADER_ENCODED);
};

export const exportExcelMaterialSuggest = async (params) => {
  get(MATERIAL_SUGGEST.exportExcel, {
    params,
    responseSuggest: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    return fileDownload(res.data, "report.xlsx");
  });
};