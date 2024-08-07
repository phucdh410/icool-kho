import { format, toDate } from "src/utils/moment";

import Base from "./base.model";
import {
  ImportPrintMaterials,
  PurchaseSlipMaterials,
  PurchaseSlipPreviewMaterials,
} from "./material.model";

export class PurchaseSlips extends Base {
  constructor({
    storeName,
    store_code,
    createdDate,
    createdBy,
    approvedStatus,
    date,
    total,
    note,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      storeName: storeName,
      store_code: store_code,
      createdDate: format(createdDate),
      createdBy: createdBy,
      approvedStatus: approvedStatus,
      date: format(date, "DD/MM/yyyy"),
      total: total,
      note: note,
    });
  }
}

export class PurchaseSlip extends Base {
  constructor({
    ware_code,
    store_code,
    date,
    materials,
    supplier,
    note,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      ware_code: ware_code,
      store_code: store_code,
      date: toDate(date),
      supplier: supplier,
      materials: materials.map((m) => new PurchaseSlipMaterials(m)),
      note: note,
    });
  }
}

export class PurchaseSlipPreview extends Base {
  constructor({
    storeName,
    storeAddress,
    storePhone,
    date,
    materials,
    total,
    note,
    groups,
    ...rest
  }) {
    super(rest);

    Object.assign(this, {
      groups,
      storeName: storeName,
      storeAddress: storeAddress,
      storePhone: storePhone,
      date: toDate(date),
      total: total,
      materials: materials.map((m) => new PurchaseSlipPreviewMaterials(m)),
      note: note,
    });
  }
}

export class ImportFormPrints extends Base {
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
      materials: materials?.map((m) => new ImportPrintMaterials(m)) ?? [],
    });
  }
}
