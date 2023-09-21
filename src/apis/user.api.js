import { map, get } from "src/utils/axios";

import { USER } from "./_constants";

import { Users } from "_models/user.model";

export const getAll = async (params) =>
	await map(({ data }) => data?.map((d) => new Users(d))).get(
		`${USER.getAll}`,
		{ params }
	);

export const getByStore = async (code) =>
	await map(({ data }) => data?.map((d) => new Users(d))).get(
		`${USER.getByStore}/${code}`
	);
