import * as api from "src/apis/role.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["roles", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
