import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/permission.api";

export const getAllFunction = (params, isLoading = false, options = {}) =>
	createQuery(["function", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});