import Base from "./base.model";

export class MaterialIndustrys extends Base {
  constructor({ acronym, code, created_by, id, name, note, status, ...rest }) {
    super(rest);

    Object.assign(this, {
      acronym: acronym || "",
      code,
      created_by,
      id,
      name,
      note: note || "",
      status,
    });
  }
}
