import { map, post, FORM_HEADER_ENCODED, put } from "src/utils/axios";

import { MATERIAL_INDUSTRY } from "./_constants";

import { MaterialIndustrys } from "_models/material-industry.model";

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

export const remove = async (codes) => {
  const params = new URLSearchParams();
  params.append("listCode", codes.join(","));
  return await post(MATERIAL_INDUSTRY.delete, params, FORM_HEADER_ENCODED);
};

export const exportExcel = async (params) => {
  const _params = new URLSearchParams();

  post(MATERIAL_INDUSTRY.exportExcel, _params, {
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => fileDownload(res.data, "nganh-nvl.xlsx"));
};
