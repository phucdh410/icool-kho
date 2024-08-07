import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  CancellationSlipMaterials,
  CancellationSlipPreviewMaterials,
} from "./material.model";

export class CancellationSlips extends Base {
  constructor({
    storeName,
    createdDate,
    date,
    note,
    sum,
    vat,
    total,
    status,
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
      status: status,
    });
  }
}

export class CancellationSlip extends Base {
  constructor({
    store_code,
    ware_code,
    createdDate,
    date,
    note,
    sum,
    vat,
    total,
    materials,
    ware_name,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      store_code: store_code,
      ware_code: ware_code,
      createdDate: createdDate,
      date: toDate(date),
      note: note,
      sum: sum,
      vat: vat,
      total: total,
      ware_name: ware_name,
      materials: materials.map((m) => new CancellationSlipMaterials(m)),
    });
  }
}

export class CancellationSlipPreview extends Base {
  constructor({
    ware_name,
    date,
    createdDate,
    total,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      ware_name,
      date,
      createdDate,
      note,
      total,
      materials: materials.map((m) => new CancellationSlipPreviewMaterials(m)),
    });
  }
}

export class CancellationSlipResponsible extends Base {
  constructor({ name, ...rest }) {
    super(rest);

    Object.assign(this, {
      name,
    });
  }
}
