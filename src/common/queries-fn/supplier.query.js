import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/supplier.api";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["suppliers", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
