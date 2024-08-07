import fileDownload from "js-file-download";

import { _delete, FORM_HEADER_ENCODED, get, map, post } from "src/utils/axios";
import { generate } from "src/utils/funcs";
import { format } from "src/utils/moment";

import {
  PurchaseProposalForm,
  PurchaseProposalFormPreview,
  PurchaseProposalFormPrints,
  PurchaseProposalForms,
} from "_models/purchase-proposal-form.model";

import { PURCHASE_PROPOSAL_FORM } from "./_constants";

export const getAll = async (params) =>
  await map(({ data }) => data.map((d) => new PurchaseProposalForms(d))).get(
    PURCHASE_PROPOSAL_FORM.getAll,
    { params }
  );

export const getAllReport = async (params) =>
  await map(({ data }) => data).get(`${PURCHASE_PROPOSAL_FORM.getAllReport}`, {
    params,
  });

export const exportReport = async (params) => {
  const _params = new URLSearchParams();

  if (params.date) _params.append("date", format(params.date, "yyyy-MM-DD"));

  if (params.storeIds) _params.append("storeIds", params.storeIds.join(","));

  if (params.nvl_group_ids)
    _params.append("nvl_group_ids", params.nvl_group_ids.join(","));

  if (params.nvl_ids) _params.append("nvl_ids", params.nvl_ids.join(","));

  post(PURCHASE_PROPOSAL_FORM.exportReport, _params, {
    responseType: "blob",
    headers: FORM_HEADER_ENCODED,
  }).then((res) => fileDownload(res.data, "report.xlsx"));
};

export const getAutoSuggest = async (store_code) =>
  await map(({ data }) => data.map((d) => d)).get(
    `${PURCHASE_PROPOSAL_FORM.getAutoSuggest}/${store_code}`
  );

export const getByStore = async (code) =>
  await map(({ data }) => data.map((d) => new PurchaseProposalForms(d))).get(
    `${PURCHASE_PROPOSAL_FORM.getByStore}/${code}`
  );

export const getPreview = async (code) =>
  await map(({ data }) => new PurchaseProposalFormPreview(data)).get(
    `${PURCHASE_PROPOSAL_FORM.getPreview}/${code}`
  );

export const getByCode = async (code) =>
  await map(({ data }) => new PurchaseProposalForm(data)).get(
    `${PURCHASE_PROPOSAL_FORM.getByCode}/${code}`
  );

export const checkUpdated = async (code, params) =>
  await get(`${PURCHASE_PROPOSAL_FORM.checkUpdated}/${code}`, { params });

export const checkSave = async (code, params) =>
  await get(`${PURCHASE_PROPOSAL_FORM.checkSave}/${code}`, { params });

export const getForPrint = async (codes) =>
  await map(({ data }) =>
    data.map((d) => new PurchaseProposalFormPrints(d))
  ).get(`${PURCHASE_PROPOSAL_FORM.getForPrint}?code=${codes.join(",")}`);

export const getForPrintByGroup = async (code) =>
  await map(({ data }) =>
    data.map((d) => new PurchaseProposalFormPrints(d))
  ).get(`${PURCHASE_PROPOSAL_FORM.getForPrint}?code=${code}&group=true`);

export const create = async ({
  store_code,
  issueDate,
  total,
  reason,
  materials,
  goods,
}) => {
  const params = new URLSearchParams();

  params.append("code", generate(store_code));
  params.append("store_code", store_code);
  params.append("issueDate", format(issueDate, "YYYY-MM-DD"));
  params.append("total", total);
  params.append("note", reason);
  params.append("reason", reason);
  params.append("materials", JSON.stringify(materials || []));
  params.append("goods", JSON.stringify(goods || []));

  return await post(PURCHASE_PROPOSAL_FORM.create, params, FORM_HEADER_ENCODED);
};

export const update = async ({
  code,
  store_code,
  issueDate,
  total,
  reason,
  materials,
  goods,
}) => {
  const params = new URLSearchParams();

  params.append("code", code);
  params.append("store_code", store_code);
  params.append("issueDate", format(issueDate, "YYYY-MM-DD"));
  params.append("total", total);
  params.append("note", reason);
  params.append("reason", reason);
  params.append("materials", JSON.stringify(materials || []));
  params.append("goods", JSON.stringify(goods || []));

  return await post(PURCHASE_PROPOSAL_FORM.update, params, FORM_HEADER_ENCODED);
};

export const correctQuantity = async ({ store_code, date }) => {
  const params = new URLSearchParams();

  params.append("store_code", store_code);
  params.append("date", format(date, "YYYY-MM-DD"));

  return await post(
    PURCHASE_PROPOSAL_FORM.correctQuantity,
    params,
    FORM_HEADER_ENCODED
  );
};

export const approve = async ({ code, status }) => {
  const params = new URLSearchParams();

  params.append("listCode", code.join(","));
  params.append("status", status);

  return await post(
    PURCHASE_PROPOSAL_FORM.approve,
    params,
    FORM_HEADER_ENCODED
  );
};

export const confirm = async ({ code, status }) => {
  const params = new URLSearchParams();

  params.append("listCode", code.join(","));
  params.append("status", status);

  return await post(
    PURCHASE_PROPOSAL_FORM.confirm,
    params,
    FORM_HEADER_ENCODED
  );
};

export const remove = async (codes) => {
  const params = new URLSearchParams();

  params.append("listCode", codes.join(","));

  return await post(PURCHASE_PROPOSAL_FORM.delete, params, FORM_HEADER_ENCODED);
};

export const getQuantitative = async (params) => {
  return await map(({ data }) => data).get(
    `${PURCHASE_PROPOSAL_FORM.quantitative}`,
    { params }
  );
};

export const handleQuantitative = async (body) => {
  return await post(PURCHASE_PROPOSAL_FORM.quantitative, body);
};

export const getQuantitativePreview = async (id) =>
  await map(({ data }) => data).get(
    `${PURCHASE_PROPOSAL_FORM.quantitative}/${id}`
  );

export const removeQuantitative = async (id) => {
  return await _delete(`${PURCHASE_PROPOSAL_FORM.quantitative}/${id}`);
};
