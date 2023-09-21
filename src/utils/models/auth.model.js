export class Authenticate {
	constructor({ token, role, storeCode, firstLogin }) {
		Object.assign(this, {
			token: token,
			firstLogin: firstLogin,
		});
	}
}
