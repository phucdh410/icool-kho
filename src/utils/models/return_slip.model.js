import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  ReturnSlipMaterials,
  ReturnSlipPreviewMaterials,
} from "./material.model";

export class ReturnSlips extends Base {
  constructor({
    storeName,
    createdDate,
    date,
    note,
    sum,
    vat,
    total,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      createdDate: format(createdDate, "DD/MM/YYYY"),
      date: format(date),
      note: note,
      sum: sum,
      vat: vat,
      total: total,
    });
  }
}

export class ReturnSlip extends Base {
  constructor({
    store_code,
    storeName,
    ware_code,
    ware_name,
    createdDate,
    date,
    note,
    sum,
    vat,
    total,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      store_code: store_code,
      storeName: storeName,
      ware_code: ware_code,
      ware_name: ware_name,
      createdDate: createdDate,
      date: toDate(date),
      note: note,
      sum: sum,
      vat: vat,
      total: total,
      materials: materials.map((m) => new ReturnSlipMaterials(m)),
    });
  }
}

export class ReturnSlipPreview extends Base {
  constructor({
    ware_name,
    createdDate,
    date,
    total,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      ware_name,
      createdDate,
      date,
      total,
      note,
      materials: materials.map((m) => new ReturnSlipPreviewMaterials(m)),
    });
  }
}
