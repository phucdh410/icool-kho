import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/material_type.api";

export const getAllMaterialTypes = (params, isLoading = false, options = {}) =>
  createQuery(
    ["material-types", params],
    () => api.getAllMaterialTypes(params),
    {
      enabled: !isLoading && Object.keys(params)?.length > 0,
      ...options,
    }
  );
