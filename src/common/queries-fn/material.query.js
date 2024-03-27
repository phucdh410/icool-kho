import { useMutation } from "react-query";

import createQuery from "src/utils/react-query/createQuery";

import * as api from "src/apis/material.api";

import { format } from "src/utils/moment";

export const getAll = (params, isLoading = false, options = {}) =>
	createQuery(["materials", params], () => api.getAll(params), {
		enabled: !isLoading,
		...options,
	});

export const getAllByUser = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

	return createQuery(
		["materials", "user", _params],
		() => api.getAllByUser(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getAllUnCheckByStore = (
	params,
	isLoading = false,
	options = {}
) => {
	const _params = { ...params };

	if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

	return createQuery(
		["materials", "store", _params],
		() => api.getAllUnCheckByStore(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getUnCheckByGroup = (params, isLoading = false, options = {}) => {
	const _params = { ...params };

	if (_params.date) _params.date = format(_params.date, "yyyy-MM-DD");

	return createQuery(
		["materials", "store", "group", _params],
		() => api.getAllUnCheckByStore(_params),
		{
			enabled: !isLoading,
			...options,
		}
	);
};

export const getByGroup = (code, isLoading, options = {}) =>
	createQuery(["materials", "group", code], () => api.getByGroup(code), {
		enabled: isLoading,
		...options,
	});

export const getByCode = (code, isLoading, options = {}) =>
	createQuery(["material", code], () => api.getByCode(code), {
		enabled: !isLoading,
		...options,
	});

export const create = () =>
	useMutation(api.create, { retry: 3, retryDelay: 500 });

export const update = () =>
	useMutation(api.update, { retry: 3, retryDelay: 500 });

export const remove = () =>
	useMutation(api.remove, { retry: 3, retryDelay: 500 });
