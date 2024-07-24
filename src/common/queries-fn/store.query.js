import * as api from "src/apis/store.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["stores", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
