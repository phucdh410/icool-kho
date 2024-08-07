import Base from "./base.model";

export class UserProfile extends Base {
  constructor({
    name,
    mobile,
    avatar,
    region_code,
    region_name,
    store_code,
    storeName,
    role_code,
    role_name,
    ware_code,
    ware_name,
    permissions,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      name: name,
      mobile: mobile,
      avatar: avatar,
      region_code: region_code,
      region_name: region_name,
      store_code: store_code,
      storeName: storeName,
      ware_code: store_code,
      ware_name: storeName,
      role_code: role_code,
      role_name: role_name,
      ware_code: ware_code,
      ware_name: ware_name,
      permissions: permissions,
    });
  }
}

export class Users extends Base {
  constructor({ name, ...rest }) {
    super(rest);

    Object.assign(this, { name: name });
  }
}
