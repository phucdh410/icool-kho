import Base from "./base.model";

export class Warehouses extends Base {
	constructor({ name, address, storeCode, ...rest }) {
		super(rest);

		Object.assign(this, {
			name,
			address,
			storeCode: storeCode,
		});
	}
}
