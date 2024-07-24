import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { create } from "src/apis/purchase_proposal_form.api";
import { history } from "src/App";
import { correctPurchaseProposal } from "src/common/correctDataFunctionFormUnitAndPrice";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { isSuccess } from "src/utils/funcs";

import { PurchaseProposalForm } from "_models/purchase-proposal-form.model";

import Form from "../../components/Form";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

const selectUserStore = createSelector(
	(state) => state.auth,
	({ storeCode }) => storeCode
);

const PurchaseProposalFormCreate = ({}) => {
	//#region Data
	const isLoading = useSelector(selectIsLoading);
	const storeCode = useSelector(selectUserStore);

	const [data] = useState(
		new PurchaseProposalForm({
			code: "",
			storeCode: storeCode,
			issueDate: new Date(),
			reason: "",
			storeAddress: "",
			storePhone: "",
		})
	);
	//#endregion

	//#region Event
	const onSubmit = async (data) => {
		const _data = correctPurchaseProposal(data);

		const res = await create(_data);

		if (isSuccess(res)) {
			history.push("/solution/list");
			noti("success", SUCCESS_MESSAGE.PURCHASE_PROPOSAL_FORM.CREATE);
		} else {
			noti("error", ERROR_MESSAGE.PURCHASE_PROPOSAL_FORM.CREATE);
		}
	};

	//#endregion

	//#region Render
	return (
		<Form isLoading={isLoading} edit={false} data={data} onSubmit={onSubmit} />
	);
	//#endregion
};

export default PurchaseProposalFormCreate;
