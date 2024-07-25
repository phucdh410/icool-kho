import fileDownload from "js-file-download";

import { FORM_HEADER_ENCODED, map, post } from "src/utils/axios";
import { format } from "src/utils/moment";

import { global } from "_configs/index";

import {
  CancellationSlip,
  CancellationSlipPreview,
  CancellationSlipResponsible,
  CancellationSlips,
} from "../utils/models/cancellation-slip.model";

import { CANCELLATION_SLIP } from "./_constants";
const { api } = global;

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new CancellationSlips(d))).get(
    CANCELLATION_SLIP.getAll,
    { params }
  );

export const getAllReport = async (params) =>
  await map(({ data }) => data).get(CANCELLATION_SLIP.getAllReport, { params });

export const getDetailReport = async (params) =>
  await map(({ data }) => data).get(CANCELLATION_SLIP.getDetailReport, {
    params,
  });

export const exportReport = async (params) => {
  const _params = new URLSearchParams();

  if (params.startAt)
    _params.append("startAt", format(params.startAt, "yyyy-MM-DD"));

  if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));

  if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));

  if (params.responsible) _params.append("responsible", params.responsible);

  post(CANCELLATION_SLIP.exportReport, _params, {
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const exportReportDetail = async (params) => {
  const _params = new URLSearchParams();

  if (params.startAt)
    _params.append("startAt", format(params.startAt, "yyyy-MM-DD"));

  if (params.endAt) _params.append("endAt", format(params.endAt, "yyyy-MM-DD"));

  if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));

  if (params.responsible) _params.append("responsible", params.responsible);

  post(CANCELLATION_SLIP.exportDetailReport, _params, {
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => {
    fileDownload(res.data, "report.xlsx");
  });
};

export const getResponsible = async (code) =>
  await map(({ data }) =>
    data.map((d) => new CancellationSlipResponsible(d))
  ).get(`${CANCELLATION_SLIP.getResponsible}/${code}`);

export const getByCode = async (code) =>
  await map(({ data }) => new CancellationSlip(data)).get(
    `${CANCELLATION_SLIP.getByCode}/${code}`
  );

export const getPreview = async (code) =>
  await map(({ data }) => new CancellationSlipPreview(data)).get(
    `${CANCELLATION_SLIP.getPreview}/${code}`
  );

export const approve = async ({
  materials,
  code,
  status,
  reason,
  responsible,
}) => {
  const params = new URLSearchParams();

  params.append("materials", materials.join(","));
  params.append("reason", reason);
  params.append("code", code);
  params.append("status", 1);
  params.append("responsible", responsible);

  return await post(
    `${CANCELLATION_SLIP.approve}`,
    params,
    FORM_HEADER_ENCODED
  );
};

export const remove = async (codes) => {
  const params = new URLSearchParams();

  params.append("listCode", codes.join(","));

  return await post(`${CANCELLATION_SLIP.delete}`, params, FORM_HEADER_ENCODED);
};

export const cancelApi = {
  create_material: async (body) => {
    return await post(`${api}/cancellation_slips/create/materials`, body);
  },
  update_material: async (body) => {
    return await post(`${api}/cancellation_slips/update/materials`, body);
  },
  save_create: async (body) => {
    return await post(`${api}/cancellation_slips/create`, body);
  },
  save_update: async (body) => {
    return await post(`${api}/cancellation_slips/update`, body);
  },
};
