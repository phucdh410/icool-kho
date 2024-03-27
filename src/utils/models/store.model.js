import Base from "./base.model";

export class Stores extends Base {
	constructor({ name, address, phone, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name,
			address: address,
			phone: phone,
		});
	}
}
