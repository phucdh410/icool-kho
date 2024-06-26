import { format, toDate } from "src/utils/moment";

import Base from "./base.model";

import { store } from "src/store";

import {
	PurchaseProposalFormGoods,
	PurchaseProposalFormPreviewGoods,
} from "./good.model";

import {
	PurchaseProposalFormMaterials,
	PurchaseProposalFormPreviewMaterials,
	PurchaseProposalFormPrintMaterials,
} from "./material.model";

import { isCentral } from "../funcs";

const mapStatus = (approvedStatus, confirmedStatus, store, byThisUser) => {
	// 0: pending | 1: yes | 2: no
	if (isCentral(store)) {
		if (approvedStatus == 1 && confirmedStatus == 0) return 0;
		// check if is central store user
		if (approvedStatus == 0 && confirmedStatus == 0 && !byThisUser) return -3;
		if (approvedStatus == 0 && confirmedStatus == 0 && byThisUser) return 0;
	}

	if (confirmedStatus == 1) /* pending for kế toán */ return 2;
	if (confirmedStatus == 2) /* reject from kế toán */ return -2;
	if (approvedStatus == 1) /* pending */ return 1;
	if (approvedStatus == 2) /* reject */ return -1;

	return 0;
};

export class PurchaseProposalForms extends Base {
	constructor({
		storeName,
		createdBy,
		creator,
		issueDate,
		approvedStatus,
		confirmedStatus,
		reason,
		total,
		...rest
	}) {
		super(rest);

		const { storeCode, user } = store.getState().auth;

		const byThisUser = true;
		// user.id !== createdBy;

		Object.assign(this, {
			storeName: storeName,
			creator: creator,
			issueDate: format(issueDate),
			status: mapStatus(approvedStatus, confirmedStatus, storeCode, byThisUser),
			reason: reason,
			total: total,
		});
	}
}

export class PurchaseProposalForm extends Base {
	constructor({
		storeCode,
		storeName,
		storeAddress,
		storePhone,
		issueDate,
		reason,
		total,
		goods,
		materials,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			storeName: storeName,
			storeCode: storeCode,
			storeAddress: storeAddress,
			storePhone: storePhone,
			issueDate: toDate(issueDate),
			reason: reason,
			total: total,
			goods: goods?.map((g) => new PurchaseProposalFormGoods(g)) ?? [],
			materials:
				materials?.map((m) => new PurchaseProposalFormMaterials(m)) ?? [],
		});
	}
}

export class PurchaseProposalFormPreview extends Base {
	constructor({
		storeCode,
		storeName,
		storeAddress,
		storePhone,
		issueDate,
		reason,
		total,
		goods,
		materials,
		...rest
	}) {
		super(rest);

		Object.assign(this, {
			storeName: storeName,
			storeCode: storeCode,
			storeAddress: storeAddress,
			storePhone: storePhone,
			issueDate: toDate(issueDate),
			reason: reason,
			total: total,
			goods: goods?.map((g) => new PurchaseProposalFormPreviewGoods(g)) ?? [],
			materials:
				materials?.map((m) => new PurchaseProposalFormPreviewMaterials(m)) ??
				[],
		});
	}
}

export class PurchaseProposalFormPrints extends Base {
	constructor({
		storeName,
		storeCode,
		storeAddress,
		storePhone,
		reason,
		total,
		materials,
		createdDate,
		date,
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
			materials:
				materials?.map((m) => new PurchaseProposalFormPrintMaterials(m)) ?? [],
		});
	}
}
