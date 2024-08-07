import Base from "./base.model";

export class Warehouses extends Base {
  constructor({ name, address, store_code, ...rest }) {
    super(rest);

    Object.assign(this, {
      name,
      address,
      store_code: store_code,
    });
  }
}
