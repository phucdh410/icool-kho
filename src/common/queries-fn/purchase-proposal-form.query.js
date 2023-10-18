import { useMutation } from "react-query";

import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/purchase_proposal_form.api";

import { format } from "src/utils/moment";

export const getAll = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.startAt) _params.startAt = format(_params.startAt, "yyyy-MM-DD");

  if (_params.endAt) _params.endAt = format(_params.endAt, "yyyy-MM-DD");

  if (_params.issueDate)
    _params.issueDate = format(_params.issueDate, "yyyy-MM-DD");

  return createQuery(
    ["purchase_proposal_forms", _params],
    () => api.getAll(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getAllReport = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

  if (_params.storeIds) _params.storeIds = _params.storeIds.join(",");

  if (_params.nvl_group_ids)
    _params.nvl_group_ids = _params.nvl_group_ids.join(",");

  if (_params.nvl_ids) _params.nvl_ids = _params.nvl_ids.join(",");

  return createQuery(
    ["purchase_proposal_forms", "reports", _params],
    () => api.getAllReport(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getByCode = (code, isLoading = false, options = {}) =>
  createQuery(["purchase_proposal_form", code], () => api.getByCode(code), {
    enabled: !isLoading,
    ...options,
  });

export const getPreview = (code, isLoading = false, options = {}) =>
  createQuery(
    ["purchase_proposal_form", "preview", code],
    () => api.getPreview(code),
    {
      enabled: !isLoading,
      ...options,
    }
  );

export const getForPrint = (codes, isLoading = false, options = {}) =>
  createQuery(
    ["purchase_proposal_form", "prints", codes],
    () => api.getForPrint(codes),
    {
      enabled: !isLoading,
      ...options,
    }
  );

export const getForPrintByGroup = (code, isLoading = false, options = {}) =>
  createQuery(
    ["purchase_proposal_form", "groups", "prints", code],
    () => api.getForPrintByGroup(code),
    {
      enabled: !isLoading,
      ...options,
    }
  );

export const creater = () =>
  useMutation(api.create, { retry: 3, retryDelay: 500 });

export const updater = () =>
  useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remover = () =>
  useMutation(api.remove, { retry: 3, retryDelay: 500 });

export const approver = (api) =>
  useMutation((values) => api(values), { retry: 3, retryDelay: 500 });

export const getAllQuantitative = (params, isLoading = false, options = {}) => {
  const _params = { ...params };

  if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

  return createQuery(
    ["quantitative_list", _params],
    () => api.getQuantitative(_params),
    {
      enabled: !isLoading,
      ...options,
    }
  );
};

export const getQuantitativePreview = (id, isLoading = false, options = {}) =>
  createQuery(
    ["quantitative_preview", "preview", id],
    () => api.getQuantitativePreview(id),
    {
      enabled: !isLoading,
      ...options,
    }
  );
