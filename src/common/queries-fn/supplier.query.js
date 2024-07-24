import * as api from "src/apis/supplier.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["suppliers", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
