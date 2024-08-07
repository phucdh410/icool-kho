import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import { InventoryAdjustmentMaterials } from "./material.model";

export class InventoryAdjustments extends Base {
  constructor({ ware_name, createdDate, date, file, ...rest }) {
    super(rest);

    Object.assign(this, {
      ware_name: ware_name,
      createdDate: format(createdDate),
      date: format(date),
      file: file,
      fileName: file?.split("/").pop() || " - ",
    });
  }
}

export class InventoryAdjustment extends Base {
  constructor({ ware_code, store_code, date, files, materials, ...rest }) {
    super(rest);

    Object.assign(this, {
      ware_code: ware_code,
      store_code: store_code,
      date: toDate(date),
      file: files.map((f) => f.path),
      materials: materials.map((m) => new InventoryAdjustmentMaterials(m)),
    });
  }
}
