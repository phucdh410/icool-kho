import * as api from "src/apis/user.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["users", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});

export const getByStore = (code, isLoading = false, options = {}) =>
	createQuery(["users", "store", code], () => api.getByStore(code), {
		enabled: !isLoading,
		...options,
	});
