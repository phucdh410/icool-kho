import fileDownload from "js-file-download";

import {
  FORM_HEADER_ENCODED,
  FORM_HEADER_FORMDATA,
  map,
  post,
} from "src/utils/axios";
import { format } from "src/utils/moment";

import {
  InventoryAdjustment,
  InventoryAdjustments,
} from "_models/inventory-adjustment.model";
import { InventoryAdjustmentMaterials } from "_models/material.model";

import { INVENTORY_ADJUSTMENT } from "./_constants";

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new InventoryAdjustments(d))).get(
    INVENTORY_ADJUSTMENT.getAll,
    { params }
  );

export const getAllReport = async (params) =>
  await map(({ data }) => data).get(`${INVENTORY_ADJUSTMENT.getReport}`, {
    params,
  });

export const exportReport = async (params) => {
  const _params = new URLSearchParams();

  if (params.startAt)
    _params.append("startAt", format(params.startAt, "yyyy-MM-DD"));
  if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));

  if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));

  if (params.nvlGroupIds)
    _params.append("nvlGroupIds", params.nvlGroupIds.join(","));

  if (params.nvlIds) _params.append("nvlIds", params.nvlIds.join(","));

  post(INVENTORY_ADJUSTMENT.exportReport, _params, {
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const getByCode = async (code) =>
  await map(({ data }) => new InventoryAdjustment(data)).get(
    `${INVENTORY_ADJUSTMENT.getByCode}/${code}`
  );

export const getMaterials = async (code) =>
  await map(({ data }) =>
    data.map((d) => new InventoryAdjustmentMaterials(d))
  ).get(`${INVENTORY_ADJUSTMENT.getMaterials}/${code}`);

export const create = async ({ ware_code, store_code, date, file }) => {
  const form = new FormData();

  form.append("ware_id", ware_code);
  form.append("cuahang_id", store_code);
  form.append("date", format(date, "YYYY-MM-DD"));
  file.length && form.append("file", file[0]);

  return await post(INVENTORY_ADJUSTMENT.create, form, FORM_HEADER_FORMDATA);
};

export const update = async ({
  code,
  ware_code,
  store_code,
  date,
  file,
  materials,
}) => {
  const form = new FormData();

  form.append("code", code);
  form.append("ware_id", ware_code);
  form.append("cuahang_id", store_code);
  form.append("date", format(date, "YYYY-MM-DD"));
  file.length && form.append("file", file[0]);

  form.append("materials", JSON.stringify(materials));

  return await post(INVENTORY_ADJUSTMENT.update, form, FORM_HEADER_FORMDATA);
};

export const remove = async (codes) => {
  const params = new URLSearchParams();

  params.append("listCode", codes.join(","));

  return await post(INVENTORY_ADJUSTMENT.delete, params, FORM_HEADER_ENCODED);
};
