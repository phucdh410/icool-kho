import Base from "./base.model";

export class Configurations extends Base {
	constructor({ name, value, extra, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name,
			extra: extra,
			value: value,
		});
	}
}
