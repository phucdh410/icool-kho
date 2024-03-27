import Base from "./base.model";

export class UserProfile extends Base {
	constructor({
		name,
		mobile,
		avatar,
		regionCode,
		regionName,
		storeCode,
		storeName,
		roleCode,
		roleName,
		wareCode,
		wareName,
		permissions,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			mobile: mobile,
			avatar: avatar,
			regionCode: regionCode,
			regionName: regionName,
			storeCode: storeCode,
			storeName: storeName,
			wareCode: storeCode,
			wareName: storeName,
			roleCode: roleCode,
			roleName: roleName,
			wareCode: wareCode,
			wareName: wareName,
			permissions: permissions,
		});
	}
}

export class Users extends Base {
	constructor({ name, ...rest }) {
		super(rest);

		Object.assign(this, { name: name });
	}
}
