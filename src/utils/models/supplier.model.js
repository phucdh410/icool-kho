import Base from "./base.model";

export class Suppliers extends Base {
	constructor({ name, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name
		});
	}
}
