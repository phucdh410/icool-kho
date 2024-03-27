import Base from "./base.model";

export class Permissions extends Base {
	constructor({ code, name, group, prior, ...rest }) {
		super(rest);

		Object.assign(this, {
			code,
      name,
      group,
      prior
		});
	}
}
