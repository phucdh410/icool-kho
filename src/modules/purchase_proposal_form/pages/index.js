import { lazy } from "react";

const PurchaseProposalFormList = lazy(() => import("./List"));
const PurchaseProposalFormCreate = lazy(() => import("./Create"));
const PurchaseProposalFormUpdate = lazy(() => import("./Update"));
const PurchaseProposalFormPrint = lazy(() => import("./Print"));
const QuantitativeListPage = lazy(() => import("./QuantitativeList"));

export {
  PurchaseProposalFormList,
  PurchaseProposalFormCreate,
  PurchaseProposalFormUpdate,
  PurchaseProposalFormPrint,
  QuantitativeListPage,
};
