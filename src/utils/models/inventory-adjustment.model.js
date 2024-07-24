import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import { InventoryAdjustmentMaterials } from "./material.model";

export class InventoryAdjustments extends Base {
  constructor({ wareName, createdDate, date, file, ...rest }) {
    super(rest);

    Object.assign(this, {
      wareName: wareName,
      createdDate: format(createdDate),
      date: format(date),
      file: file,
      fileName: file?.split("/").pop() || " - ",
    });
  }
}

export class InventoryAdjustment extends Base {
  constructor({ wareCode, storeCode, date, files, materials, ...rest }) {
    super(rest);

    Object.assign(this, {
      wareCode: wareCode,
      storeCode: storeCode,
      date: toDate(date),
      file: files.map((f) => f.path),
      materials: materials.map((m) => new InventoryAdjustmentMaterials(m)),
    });
  }
}
