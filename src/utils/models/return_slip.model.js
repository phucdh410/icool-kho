import Base from "./base.model";

import { ReturnSlipMaterials, ReturnSlipPreviewMaterials } from "./material.model";

import { format } from "src/utils/moment";

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
			createdDate: format(createdDate, "DD/MM/yyyy HH:mm:ss"),
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
		storeCode,
		storeName,
		wareCode,
		wareName,
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
			storeCode: storeCode,
			storeName: storeName,
			wareCode: wareCode,
			wareName: wareName,
			createdDate: createdDate,
			date: date,
			note: note,
			sum: sum,
			vat: vat,
			total: total,
			materials: materials.map((m) => new ReturnSlipMaterials(m)),
		});
	}
}

export class ReturnSlipPreview extends Base {
	constructor({ wareName, createdDate, date, total, note, materials, ...rest }) {
		super(rest);

		Object.assign(this, {
			wareName,
			createdDate,
			date,
			total,
			note, 
			materials: materials.map(m => new ReturnSlipPreviewMaterials(m))
		})
	}
}