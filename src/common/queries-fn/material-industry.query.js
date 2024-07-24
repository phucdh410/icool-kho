import { useMutation } from "react-query";

import * as api from "src/apis/material_industry.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) => {
  return createQuery(["industries", params], () => api.getAll(params), {
    enabled: !isLoading && Object.keys(params).length > 0,
    ...options,
  });
};

export const getByCode = (code, isLoading, options = {}) =>
  createQuery(["industry", code], () => api.getByCode(code), {
    enabled: !isLoading,
    ...options,
  });

export const create = () =>
  useMutation(api.create, { retry: 3, retryDelay: 500 });

export const update = () =>
  useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remove = () =>
  useMutation(api.remove, { retry: 3, retryDelay: 500 });
