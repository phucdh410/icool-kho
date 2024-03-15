import { format } from "src/utils/moment";

import Base from "./base.model";

export class MaterialGroups extends Base {
  constructor({ name, active, createdDate, createdBy, ...rest }) {
    super(rest);

    Object.assign(this, {
      name,
      active,
      createdBy: createdBy,
      ...rest,
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
