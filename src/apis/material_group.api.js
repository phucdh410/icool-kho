import { map, post, FORM_HEADER_ENCODED, get } from "src/utils/axios";

import { MATERIAL_GROUP } from "./_constants";

import { MaterialGroups } from "_models/material-group.model";
import fileDownload from "js-file-download";

export const getForRole = async () =>
  await map(({ data }) => data).get(MATERIAL_GROUP.getForRole);

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new MaterialGroups(d))).get(
    MATERIAL_GROUP.getAll,
    { params }
  );

export const getByCode = async (code) =>
  await map().get(`${MATERIAL_GROUP.getByCode}/${code}`);

export const create = async (values) => {
  const params = new URLSearchParams();

  params.append("code", values?.code);
  params.append("name", values?.name);
  params.append("acronym", values?.acronym);
  params.append("note", values?.note);
  params.append("industryCode", values?.industryCode);
  params.append("industryName", values?.industryName);
  params.append("active", Number(values?.active));

  return await post(MATERIAL_GROUP.create, params, FORM_HEADER_ENCODED);
};

export const update = async (values) => {
  const params = new URLSearchParams();

  params.append("code", values?.code);
  params.append("name", values?.name);
  params.append("acronym", values?.acronym);
  params.append("note", values?.note);
  params.append("industryCode", values?.industryCode);
  params.append("industryName", values?.industryName);
  params.append("active", values?.active);

  return await post(MATERIAL_GROUP.update, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
  const params = new URLSearchParams();
  params.append("listCode", codes.join(","));
  return await post(MATERIAL_GROUP.delete, params, FORM_HEADER_ENCODED);
};

export const exportExcel = async (params) => {
  get(MATERIAL_GROUP.exportExcel, {
    params,
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    return fileDownload(res.data, "report.xlsx");
  });
};
