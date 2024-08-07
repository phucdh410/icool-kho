import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  InventorySlipMaterials,
  InventorySlipPreviewMaterials,
} from "./material.model";

export class InventorySlips extends Base {
  constructor({
    storeName,
    checked,
    createdBy,
    approvedStatus,
    note,
    value,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      checked: format(checked),
      createdBy: createdBy,
      status: approvedStatus,
      value: value,
      note: note,
    });
  }
}

export class InventorySlip extends Base {
  constructor({
    ware_code,
    store_code,
    createdBy,
    checked,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      store_code: store_code,
      ware_code: ware_code,
      createdBy: createdBy,
      checked: toDate(checked),
      note: note,
      materials: materials.map((m) => new InventorySlipMaterials(m)),
    });
  }
}

export class InventorySlipPreview extends Base {
  constructor({
    ware_name,
    checked,
    createdBy,
    value,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      ware_name: ware_name,
      checked: checked,
      createdBy: createdBy,
      value: value,
      note: note,
      materials: materials.map((m) => new InventorySlipPreviewMaterials(m)),
    });
  }
}
