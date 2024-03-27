import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/good.api";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["goods", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
