import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/warehouse.api";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["warehouses", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
