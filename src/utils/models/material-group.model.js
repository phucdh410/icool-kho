import { format } from "src/utils/moment";

import Base from "./base.model";

export class MaterialGroups extends Base {
	constructor({ name, active, createdDate, createdBy, ...rest }) {
		super(rest);

		Object.assign(this, {
			name,
			active,
			createdDate: format(createdDate),
			createdBy: createdBy,
		});
	}
}

export class MaterialGroup extends Base {
	constructor({ name, active, ...rest }) {
		super(rest);
		Object.assign(this, {
			name,
			active,
		});
	}
}
