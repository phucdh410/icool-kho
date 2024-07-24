import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { update } from "src/apis/purchase_proposal_form.api";
import { history } from "src/App";
import { correctPurchaseProposal } from "src/common/correctDataFunctionFormUnitAndPrice";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { isSuccess } from "src/utils/funcs";

import { getByCode } from "_common/queries-fn/purchase-proposal-form.query";

import Form from "../../components/Form";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const PurchaseProposalFormUpdate = ({ match: { params } }) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const { data, refetch } = getByCode(params.code, isLoading);
  //#endregion

  //#region Event
  const onSubmit = async (data) => {
    const _data = correctPurchaseProposal(data);

    const res = await update(_data);

    if (isSuccess(res)) {
      refetch();
      history.push("/solution/list");
      noti("success", SUCCESS_MESSAGE.PURCHASE_PROPOSAL_FORM.UPDATE);
    } else {
      noti("error", ERROR_MESSAGE.PURCHASE_PROPOSAL_FORM.UPDATE);
    }
  };

  //#endregion

  //#region Render
  return (
    <Form isLoading={isLoading} edit={true} data={data} onSubmit={onSubmit} />
  );
  //#endregion
};

export default PurchaseProposalFormUpdate;
