import { useMutation } from "react-query";

import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/material_group.api";

export const getForRole = (isLoading = false, options = {}) =>
  createQuery(["material-groups", "permission"], () => api.getForRole(), {
    enabled: !isLoading,
    ...options,
  });

export const getAll = (params, isLoading = false, options = {}) =>
  createQuery(["material-groups", params], () => api.getAll(params), {
    enabled: !isLoading,
    ...options,
  });

export const getByCode = (code, isLoading, options = {}) =>
  createQuery(["material-group", code], () => api.getByCode(code), {
    enabled: !isLoading,
    ...options,
  });

export const create = () =>
  useMutation(api.create, { retry: 3, retryDelay: 500 });

export const update = () =>
  useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remove = () =>
  useMutation(api.remove, { retry: 3, retryDelay: 500 });
