import {
  map,
  post,
  FORM_HEADER_ENCODED,
  put,
  _delete,
  get,
  FORM_HEADER_EXCEL,
} from "src/utils/axios";

import { MATERIAL_INDUSTRY } from "./_constants";

import { MaterialIndustrys } from "_models/material-industry.model";
import fileDownload from "js-file-download";

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new MaterialIndustrys(d))).get(
    MATERIAL_INDUSTRY.getAll,
    { params }
  );

export const getByCode = async (code) =>
  await map().get(`${MATERIAL_INDUSTRY.getByCode}/${code}`);

export const create = async (body) => {
  return await post(MATERIAL_INDUSTRY.create, body, FORM_HEADER_ENCODED);
};

export const update = async (id, body) => {
  return await put(
    `${MATERIAL_INDUSTRY.update}/${id}`,
    body,
    FORM_HEADER_ENCODED
  );
};

export const remove = async (id) => {
  return await _delete(
    `${MATERIAL_INDUSTRY.delete}/${id}`,
    FORM_HEADER_ENCODED
  );
};

export const exportExcel = async (params) => {
  get(MATERIAL_INDUSTRY.exportExcel, {
    params,
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    return fileDownload(res.data, "report.xlsx");
  });
};
