import { map, put } from "src/utils/axios";
import { Authenticate } from "src/utils/models/auth.model";
import { UserProfile } from "src/utils/models/user.model";

import { AUTH } from "./_constants";

export async function login(username, password) {
	return await map(({ data }) => {
		if (data) return new Authenticate(data);
		return null;
	}).post(AUTH.login, {
		username,
		password,
		fcm: "FCM",
	});
}

export async function logout() {
	return await put(AUTH.logout);
}

export async function profile() {
	return await map(({ data }) => new UserProfile(data)).get(AUTH.profile);
}
