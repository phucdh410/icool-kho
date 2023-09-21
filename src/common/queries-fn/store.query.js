import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/store.api";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["stores", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});
