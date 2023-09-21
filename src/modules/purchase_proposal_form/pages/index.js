import { lazy } from "react";

const PurchaseProposalFormList = lazy(() => import("./List"));
const PurchaseProposalFormCreate = lazy(() => import("./Create"));
const PurchaseProposalFormUpdate = lazy(() => import("./Update"));
const PurchaseProposalFormPrint = lazy(() => import("./Print"));

export {
	PurchaseProposalFormList,
	PurchaseProposalFormCreate,
	PurchaseProposalFormUpdate,
	PurchaseProposalFormPrint,
};
