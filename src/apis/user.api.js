import { get,map } from "src/utils/axios";

import { Users } from "_models/user.model";

import { USER } from "./_constants";

export const getAll = async (params) =>
	await map(({ data }) => data?.map((d) => new Users(d))).get(
		`${USER.getAll}`,
		{ params }
	);

export const getByStore = async (code) =>
	await map(({ data }) => data?.map((d) => new Users(d))).get(
		`${USER.getByStore}/${code}`
	);
