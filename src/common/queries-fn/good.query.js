import * as api from "src/apis/good.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["goods", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
