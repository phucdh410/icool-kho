import Base from "./base.model";

import {
	CancellationSlipMaterials,
	CancellationSlipPreviewMaterials,
} from "./material.model";

import { format } from "src/utils/moment";

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
			createdDate: format(createdDate, "DD/MM/yyyy HH:mm:ss"),
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
		storeCode,
		wareCode,
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
			wareCode: wareCode,
			createdDate: createdDate,
			date: date,
			note: note,
			sum: sum,
			vat: vat,
			total: total,
			materials: materials.map((m) => new CancellationSlipMaterials(m)),
		});
	}
}

export class CancellationSlipPreview extends Base {
	constructor({
		wareName,
		date,
		createdDate,
		total,
		note,
		materials,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			wareName,
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
