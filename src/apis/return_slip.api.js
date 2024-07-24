import { FORM_HEADER_ENCODED, map, post } from "src/utils/axios";
import { format } from "src/utils/moment";

import {
  ReturnSlip,
  ReturnSlipPreview,
  ReturnSlips,
} from "../utils/models/return_slip.model";

import { RETURN_SLIP } from "./_constants";

import { global } from "_configs/index";
const { api } = global;

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new ReturnSlips(d))).get(
    RETURN_SLIP.getAll,
    { params }
  );

export const getByCode = async (code) =>
  await map(({ data }) => new ReturnSlip(data)).get(
    `${RETURN_SLIP.getByCode}/${code}`
  );

export const getPreview = async (code) =>
  await map(({ data }) => new ReturnSlipPreview(data)).get(
    `${RETURN_SLIP.getPreview}/${code}`
  );

export const toExcel = (params = {}) => {
  if (params.startAt) params.startAt = format(params.startAt, "yyyy-MM-DD");
  if (params.endAt) params.endAt = format(params.endAt, "yyyy-MM-DD");

  get(RETURN_SLIP.export, { responseType: "blob", params }).then((res) =>
    fileDownload(res.data, "report.xlsx")
  );
};

export const create = async ({ ware, store, date, note, materials, files }) => {
  const form = new FormData();

  form.append("ware_id", ware);
  form.append("cuahang_id", store);
  form.append("date", date);
  form.append("note", note);
  form.append("materials", JSON.stringify(materials));
  files.forEach((file) => form.append("files", file));

  return await post(RETURN_SLIP.create, form, FORM_HEADER_ENCODED);
};

export const update = async ({
  code,
  ware,
  store,
  date,
  note,
  materials,
  files,
}) => {
  const form = new FormData();

  form.append("code", code);
  form.append("ware_id", ware);
  form.append("cuahang_id", store);
  form.append("date", date);
  form.append("note", note);
  form.append("materials", JSON.stringify(materials));
  files.forEach((file) => form.append("files", file));

  return await post(RETURN_SLIP.update, form, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
  const params = new URLSearchParams();

  params.append("listCode", codes.join(","));

  return await post(RETURN_SLIP.delete, params, FORM_HEADER_ENCODED);
};

export const returnApi = {
  create_material: async (body) => {
    return await post(`${api}/returns_slips/create/materials`, body);
  },
  update_material: async (body) => {
    return await post(`${api}/returns_slips/update/materials`, body);
  },
  save_create: async (body) => {
    return await post(`${api}/returns_slips/create`, body);
  },
  save_update: async (body) => {
    return await post(`${api}/returns_slips/update`, body);
  },
};
