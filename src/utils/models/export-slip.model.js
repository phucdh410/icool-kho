import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  ExportPrintMaterials,
  ExportSlipMaterials,
  ExportSlipPreviewMaterials,
} from "./material.model";

export class ExportSlips extends Base {
  constructor({
    store_name,
    store_code,
    created_date,
    created_by,
    approved_status,
    date,
    approved_by,
    total,
    note,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      store_name: store_name,
      store_code: store_code,
      created_date: format(created_date, "DD/MM/yyyy"),
      created_by: created_by,
      date: format(date, "DD/MM/yyyy"),
      approved_status: approved_status,
      approved_by: approved_by,
      total: total,
      note: note,
    });
  }
}

export class ExportSlip extends Base {
  constructor({
    store_code,
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
      store_code: store_code,
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
    store_code,
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
      store_code: store_code,
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
    store_code,
    storeName,
    storePhone,
    total,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      store_code: store_code,
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
