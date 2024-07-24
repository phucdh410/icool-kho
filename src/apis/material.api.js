import { FORM_HEADER_ENCODED, get,map, post } from "src/utils/axios";

import { Materials } from "_models/material.model";

import { INVENTORY_SLIP, MATERIAL } from "./_constants";

export const getAll = async (params) => {
  return await map(({ data }) => data.map((d) => new Materials(d))).get(
    MATERIAL.getAll,
    { params }
  );
};
export const getAllByUser = async ({ storeCode, ...params }) => {
  return await map(({ data }) => data.map((d) => new Materials(d))).get(
    `${MATERIAL.getAllByUser}/${storeCode}`,
    { params }
  );
};

export const getAllUnCheckByStore = async (params) => {
  return await map(({ data }) => data.map((d) => new Materials(d))).get(
    `${INVENTORY_SLIP.getMaterial}`,
    { params }
  );
};

export const getByGroup = async (code) => {
  return await map(({ data }) => data.map((d) => new Materials(d))).get(
    `${MATERIAL.getByGroupCode}/${code}`
  );
};
export const getByCode = async (code) =>
  await map(({ data }) => data).get(`${MATERIAL.getByCode}/${code}`);

export const create = async (data) => {
  const params = new URLSearchParams();

  Object.keys(data).forEach((key) => params.append(key, data[key]));

  return await post(MATERIAL.create, params, FORM_HEADER_ENCODED);
};

export const update = async (data) => {
  const params = new URLSearchParams();

  Object.keys(data).forEach((key) => params.append(key, data[key]));

  return await post(MATERIAL.update, params, FORM_HEADER_ENCODED);
};

export const remove = async (codes) => {
  const params = new URLSearchParams();

  params.append("listCode", codes.join(","));

  return await post(MATERIAL.delete, params, FORM_HEADER_ENCODED);
};

export const getAllTransferMaterials = async (params) => {
  return await get(MATERIAL.getTransferMaterials, { params });
};

export const createTransfer = async (body) => {
  return await post(MATERIAL.createTransfer, body);
};

export const getTransferById = async (id) =>
  await map(({ data }) => data).get(`${MATERIAL.getTransferById}/${id}`);

export const updateTransfer = async (body) => {
  return await post(MATERIAL.updateTransfer, body);
};

export const deleteTransfer = async (id) => {
  return await post(MATERIAL.deleteTransfer, { id });
};

export const getAllTransfers = async (params) => {
  return await map(({ data }) => data.map((d) => d)).get(
    MATERIAL.getAllTransfers,
    { params }
  );
};

export const updateTransferStatus = async (body) => {
  return await post(MATERIAL.confirmTransfer, body);
};
