import * as api from "src/apis/material_type.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAllMaterialTypes = (params, isLoading = false, options = {}) =>
  createQuery(
    ["material-types", params],
    () => api.getAllMaterialTypes(params),
    {
      enabled: !isLoading && Object.keys(params)?.length > 0,
      ...options,
    }
  );
