import * as api from "src/apis/configuration.api";
import createQuery from "src/utils/react-query/createQuery";

export const getAllSlips = (params, isLoading = false, options = {}) =>
	createQuery(
		["configuration", "slip", params],
		() => api.getAllSlips(params),
		{
			enabled: !isLoading,
			...options,
		}
	);

export const getAllExports = (params, isLoading = false, options = {}) =>
	createQuery(
		["configuration", "categories", params],
		() => api.getAllExports(params),
		{
			enabled: !isLoading,
			...options,
		}
	);
