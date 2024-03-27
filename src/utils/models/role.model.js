import Base from "./base.model";

export class Roles extends Base {
	constructor({ name, active, ...rest }) {
		super(rest);

    Object.assign(this, {
      name, active
		});
	}
}
