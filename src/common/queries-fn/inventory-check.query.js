import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/inventory_slip.api";

import { format } from "src/utils/moment";
import { useMutation } from "react-query";

export const getAll = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
  if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");
  if (_params.wareCode) _params.wareCode = "";

  return createQuery(["inventory_checks", _params], () => api.getAll(_params), {
    enabled: !isLoading,
    ...options,
  });
};

export const getAllReport = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
  if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

  if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");

  if (_params.responsible) _params.responsible = _params.responsible.join(",");

  return createQuery(
    ["inventory_checks", "reports", _params],
    () => api.getAllReport(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getDetailReport = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");
  if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

  if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");

  if (_params.responsible) _params.responsible = _params.responsible.join(",");

  return createQuery(
    ["inventory_checks", "reports", _params],
    () => api.getDetailReport(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getPreview = (code, isLoading = false, options = {}) => {
  return createQuery(
    ["inventory_check", "preview", code],
    () => api.getPreview(code),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getByCode = (code, isLoading = false, options = {}) => {
  return createQuery(["inventory_check", code], () => api.getByCode(code), {
    enabled: !isLoading,
    ...options,
  });
};

export const approver = () =>
  useMutation((values) => api.approve(values), { retry: 3, retryDelay: 300 });
