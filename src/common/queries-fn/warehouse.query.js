import * as api from "src/apis/warehouse.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["warehouses", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
