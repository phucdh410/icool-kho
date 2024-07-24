import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  ExportPrintMaterials,
  ExportSlipMaterials,
  ExportSlipPreviewMaterials,
} from "./material.model";

export class ExportSlips extends Base {
  constructor({
    storeName,
    createdDate,
    date,
    approvedStatus,
    approvedBy,
    total,
    note,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      createdDate: format(createdDate),
      date: format(date),
      approvedStatus: approvedStatus,
      approvedBy: approvedBy,
      total: total,
      note: note,
    });
  }
}

export class ExportSlip extends Base {
  constructor({
    storeCode,
    storeAddress,
    storePhone,
    date,
    price,
    sum,
    vat,
    total,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeCode: storeCode,
      storeAddress: storeAddress,
      storePhone: storePhone,
      date: toDate(date),
      price: price,
      sum: sum,
      vat: vat,
      total: total,
      note: note,
      materials: materials.map((m) => new ExportSlipMaterials(m)),
    });
  }
}

export class ExportSlipPreview extends Base {
  constructor({
    storeCode,
    storeName,
    storeAddress,
    storePhone,
    date,
    price,
    sum,
    vat,
    total,
    note,
    materials,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeCode: storeCode,
      storeName: storeName,
      storeAddress: storeAddress,
      storePhone: storePhone,
      date: toDate(date),
      price: price,
      sum: sum,
      vat: vat,
      total: total,
      note: note,
      materials: materials.map((m) => new ExportSlipPreviewMaterials(m)),
    });
  }
}

export class ExprotFormPrints extends Base {
  constructor({
    approvedBy,
    createdDate,
    date,
    materials,
    reason,
    storeAddress,
    storeCode,
    storeName,
    storePhone,
    total,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      storeCode: storeCode,
      storeAddress: storeAddress,
      storePhone: storePhone,
      reason: reason,
      total: total,
      createdDate,
      date,
      approvedBy,
      materials: materials?.map((m) => new ExportPrintMaterials(m)) ?? [],
    });
  }
}
