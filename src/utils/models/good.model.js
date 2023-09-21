import Base from "./base.model";

export class Goods extends Base {
	constructor(
		name,
		unit,
		price,
		wareUnit,
		warePrice,
		boughtUnit,
		boughtPrice,
		...rest
	) {
		super(rest);

		Object.assign(this, {
			name: name,
			unit: unit,
			price: price,
			wareUnit: wareUnit,
			warePrice: warePrice,
			boughtUnit: boughtUnit,
			boughtPrice: boughtPrice,
		});
	}
}

export class PurchaseProposalFormGoods extends Base {
	constructor({ unit, quantity, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			quantity: quantity,
			note: note,
			unit: unit,
			price: total / quantity,
			total,
		});
	}
}

export class PurchaseProposalFormPreviewGoods extends Base {
	constructor({ name, unit, quantity, note, total, ...rest }) {
		super(rest);

		Object.assign(this, {
			name: name,
			quantity: quantity,
			note: note,
			boughtUnit: unit,
			boughtPrice: total / quantity,
			total,
		});
	}
}
