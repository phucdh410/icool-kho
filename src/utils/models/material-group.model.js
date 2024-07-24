import Base from "./base.model";

export class MaterialGroups extends Base {
  constructor({ name, active, createdBy, ...rest }) {
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
