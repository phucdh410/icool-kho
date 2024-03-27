import Base from "./base.model";

export class BacklogSlips extends Base {
	constructor({
		name,
		wareUnit,
		opening,
		imported,
		exported,
		cancelled,
		extraImported,
		extraExported,
		closing,
		warePrice,
		...rest
	}) {
		super(rest);

		const extra = extraImported - extraExported;

		Object.assign(this, {
			name: name,
			wareUnit: wareUnit,
			opening: opening ?? " - ",
			imported: imported ?? " - ",
			exported: exported ?? " - ",
			cancelled: cancelled ?? " - ",
			extra: extraImported === null ? " - " : extra,
			closing: closing ?? " - ",
			total: warePrice * closing ?? 0,
		});
	}
}

export class BacklogSlipInstants extends Base {
	constructor({
		name,
		wareUnit,
		opening,
		imported,
		exported,
		cancelled,
		extraImported,
		extraExported,
		closing,
		real,
		diff,
		warePrice,
		...rest
	}) {
		super(rest);

		const extra = extraImported - extraExported;

		Object.assign(this, {
			name: name,
			wareUnit: wareUnit,
			opening: opening ?? " - ",
			imported: imported ?? " - ",
			exported: exported ?? " - ",
			cancelled: cancelled ?? " - ",
			extra: extraImported === null ? " - " : extra,
			closing: closing ?? " - ",
			real: real ?? " - ",
			diff: diff ?? " - ",
			warePrice: warePrice,
			total: warePrice * closing ?? 0,
		});
	}
}
