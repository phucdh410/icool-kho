import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/material_suggest.api";

export const getAllMaterialSuggests = (
  params,
  isLoading = false,
  options = {}
) =>
  createQuery(
    ["material-suggests", params],
    () => api.getAllMaterialSuggests(params),
    {
      enabled: !isLoading && Object.keys(params)?.length > 0,
      ...options,
    }
  );
