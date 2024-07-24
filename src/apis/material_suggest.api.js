import fileDownload from "js-file-download";

import { _delete, FORM_HEADER_ENCODED, get,map, post } from "src/utils/axios";

import { MATERIAL_SUGGEST } from "./_constants";

export const getAllMaterialSuggests = async (params) =>
  await map(({ data }) => data).get(MATERIAL_SUGGEST.getAll, { params });

export const createMaterialSuggest = async (body) => {
  return await post(MATERIAL_SUGGEST.create, body, FORM_HEADER_ENCODED);
};

export const getMaterialSuggestByCode = async (code) => {
  return await get(`${MATERIAL_SUGGEST.getByCode}/${code}`);
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
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    return fileDownload(res.data, "report.xlsx");
  });
};

export const createPriceSuggest = async (body) => {
  return await post(MATERIAL_SUGGEST.createSuggest, body);
};

export const removePriceSuggest = async (id) => {
  return await post(MATERIAL_SUGGEST.deleteSuggest, { id });
};

export const confirmPriceSuggest = async (id) => {
  return await post(MATERIAL_SUGGEST.confirm, { id });
};

export const approveMaterialSuggest = async (code) => {
  return await post(MATERIAL_SUGGEST.approve, { code });
};
