import { lazy } from "react";

const PurchaseProposalFormList = lazy(() => import("./List"));
const PurchaseProposalFormCreate = lazy(() => import("./Create"));
const PurchaseProposalFormUpdate = lazy(() => import("./Update"));
const PurchaseProposalFormPrint = lazy(() => import("./Print"));
const QuantitativeListPage = lazy(() => import("./QuantitativeList"));
const TransferListPage = lazy(() => import("./TransferList"));
const TransferCreatePage = lazy(() => import("./TransferCreate"));
const TransferUpdatePage = lazy(() => import("./TransferUpdate"));

export {
  PurchaseProposalFormList,
  PurchaseProposalFormCreate,
  PurchaseProposalFormUpdate,
  PurchaseProposalFormPrint,
  QuantitativeListPage,
  TransferListPage,
  TransferCreatePage,
  TransferUpdatePage,
};
