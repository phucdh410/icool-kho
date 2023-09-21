import Base from "./base.model";

export class Materials extends Base {
	constructor({
		name,
		price,
		unit,
		wareUnit,
		warePrice,
		wareEx,
		boughtUnit,
		boughtPrice,
		boughtEx,
		providerUnit,
		providerPrice,
		providerEx,
		max,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			price: price,
			unit: unit,
			wareUnit: wareUnit,
			warePrice: warePrice,
			wareEx: wareEx,
			boughtUnit: boughtUnit,
			boughtPrice: boughtPrice,
			boughtEx: boughtEx,
			providerUnit: providerUnit,
			providerPrice: providerPrice,
			providerEx: providerEx,
			max,
		});
	}
}

export class Material extends Base {
	constructor({
		name,
		groupId,
		price,
		unit,
		wareUnit,
		wareEx,
		boughtUnit,
		boughtEx,
		providerUnit,
		providerEx,
		expired,
		allow,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			groupId: groupId,
			price: price,
			unit: unit,
			wareUnit: wareUnit,
			wareEx: wareEx,
			boughtUnit: boughtUnit,
			boughtEx: boughtEx,
			providerUnit: providerUnit,
			providerEx: providerEx,
			expired: expired,
			allow: allow,
		});
	}
}

export class PurchaseProposalFormMaterials extends Base {
	constructor({
		name,
		price,
		unit,
		wareUnit,
		warePrice,
		wareEx,
		boughtUnit,
		boughtPrice,
		boughtEx,
		boughtQ,
		providerUnit,
		providerPrice,
		providerEx,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			price: price,
			unit: unit,
			wareUnit: wareUnit,
			warePrice: warePrice,
			wareEx: wareEx,
			boughtUnit: boughtUnit,
			boughtPrice: boughtPrice,
			boughtEx: boughtEx,
			boughtQ: boughtQ,
			providerUnit: providerUnit,
			providerPrice: providerPrice,
			providerEx: providerEx,
		});
	}
}

export class PurchaseProposalFormPreviewMaterials extends Base {
	constructor({ name, quantity, boughtUnit, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name,
			quantity: quantity,
			boughtUnit: boughtUnit,
			note: note,
			boughtPrice: total / quantity,
			total: total,
		});
	}
}

export class PurchaseProposalFormAutoSuggestMaterials extends Base {
	constructor({ quantity, boughtUnit, boughtPrice, ...rest }) {
		super(rest);

		Object.assign(this, {
			quantity: quantity,
			boughtUnit: boughtUnit,
			boughtPrice: boughtPrice,
			total: quantity * boughtPrice,
		});
	}
}

export class PurchaseProposalFormPrintMaterials extends Base {
	constructor({ quantity, name, boughtUnit, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			quantity: quantity,
			name: name,
			boughtUnit: boughtUnit,
			note: note,
			price: total / quantity,
			total: total,
		});
	}
}

export class ExportSlipMaterials extends Base {
	constructor({
		wareUnit,
		warePrice,
		wareEx,
		boughtUnit,
		boughtPrice,
		boughtEx,
		boughtQ,
		providerUnit,
		providerPrice,
		providerEx,
		providerQ,
		price,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			wareUnit: wareUnit,
			warePrice: warePrice,
			wareEx: wareEx,
			boughtUnit: boughtUnit,
			boughtPrice: boughtPrice,
			boughtEx: boughtEx,
			boughtQ: boughtQ,
			providerUnit: providerUnit,
			providerPrice: providerPrice,
			providerEx: providerEx,
			// providerQ: providerQ,
			price,
		});
	}
}

export class ExportSlipPreviewMaterials extends Base {
	constructor({
		name,
		boughtUnit,
		boughtQ,
		wareUnit,
		wareQ,
		providerUnit,
		providerQ,
		total,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			boughtUnit: boughtUnit,
			boughtQ: boughtQ,
			wareUnit: wareUnit,
			wareQ: wareQ,
			providerUnit: providerUnit,
			providerQ: providerQ,
			total,
		});
	}
}

export class ExportPrintMaterials extends Base {
	constructor({ quantity, name, boughtUnit, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			quantity: quantity,
			name: name,
			boughtUnit: boughtUnit,
			note: note,
			price: total / quantity,
			total: total,
		});
	}
}

export class ImportPrintMaterials extends Base {
	constructor({ quantity, name, boughtUnit, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			quantity: quantity,
			name: name,
			boughtUnit: boughtUnit,
			note: note,
			price: total / quantity,
			total: total,
		});
	}
}

export class CancellationSlipMaterials extends Base {
	constructor({
		name,
		wareUnit,
		wareQ,
		price,
		total,
		approvedStatus,
		responsible,
		reason,
		files,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			wareUnit: wareUnit,
			wareQ: wareQ,
			price: price,
			total: total,
			approvedStatus: approvedStatus,
			responsible: responsible,
			reason: reason,
			files: files,
		});
	}
}

export class CancellationSlipPreviewMaterials extends Base {
	constructor({
		name,
		wareQ,
		wareUnit,
		total,
		responsible,
		approvedStatus,
		reason,
		files,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name,
			wareQ,
			wareUnit,
			total,
			responsible,
			approvedStatus,
			reason,
			files,
		});
	}
}
export class ReturnSlipMaterials extends Base {
	constructor({
		name,
		wareUnit,
		wareQ,
		price,
		total,
		approvedStatus,
		responsible,
		reason,
		files,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			wareUnit: wareUnit,
			wareQ: wareQ,
			price: price,
			total: total,
			approvedStatus: approvedStatus,
			responsible: responsible,
			reason: reason,
			files: files,
		});
	}
}

export class ReturnSlipPreviewMaterials extends Base {
	constructor({
		name,
		wareQ,
		wareUnit,
		total,
		approvedStatus,
		reason,
		files,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name,
			wareQ,
			wareUnit,
			total,
			approvedStatus,
			reason,
			files,
		});
	}
}
export class InventoryAdjustmentMaterials extends Base {
	constructor({
		name,
		wareUnit,
		wareQ,
		approvedStatus,
		price,
		sum,
		vat,
		total,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name,
			wareUnit: wareUnit,
			wareQ: wareQ,
			approvedStatus: approvedStatus,
			price: price,
			sum: sum,
			vat: vat,
			total: total,
		});
	}
}

export class InventorySlipMaterials extends Base {
	constructor({
		name,
		price,
		unit,
		quantity,
		wareUnit,
		warePrice,
		wareQ,
		wareEx,
		boughtUnit,
		boughtPrice,
		boughtQ,
		boughtEx,
		providerUnit,
		providerPrice,
		providerQ,
		providerEx,

		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name,
			price,
			unit,
			quantity,
			wareUnit,
			warePrice,
			wareQ,
			wareEx,
			boughtUnit,
			boughtPrice,
			boughtQ,
			boughtEx,
			providerUnit,
			providerPrice,
			providerQ,
			providerEx,
		});
	}
}

export class InventorySlipPreviewMaterials extends Base {
	constructor({ name, unit, quantity, wareUnit, wareQ, price, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name,
			unit: unit,
			quantity: quantity,
			wareUnit: wareUnit,
			wareQ: wareQ,
			price: price,
			total: wareQ * price,
		});
	}
}

export class PurchaseSlipMaterials extends Base {
	constructor({
		wareUnit,
		wareQ,
		wareEx,
		warePrice,
		boughtUnit,
		boughtQ,
		boughtEx,
		boughtPrice,
		providerUnit,
		providerQ,
		providerEx,
		providerPrice,
		price,
		total,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			wareUnit: wareUnit,
			wareQ: wareQ,
			wareEx: wareEx,
			warePrice: warePrice,
			boughtUnit: boughtUnit,
			boughtQ: boughtQ,
			boughtEx: boughtEx,
			boughtPrice: boughtPrice,
			providerUnit: providerUnit,
			providerQ: providerQ,
			providerEx: providerEx,
			providerPrice: providerPrice,
			price: price,
			total: total,
		});
	}
}

export class PurchaseSlipPreviewMaterials extends Base {
	constructor({
		name,
		wareUnit,
		wareQ,
		boughtUnit,
		boughtQ,
		providerUnit,
		providerQ,
		price,
		total,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			name: name,
			wareUnit: wareUnit,
			wareQ: wareQ,
			boughtUnit: boughtUnit,
			boughtQ: boughtQ,
			providerUnit: providerUnit,
			providerQ: providerQ,
			price: price,
			total: total,
		});
	}
}
