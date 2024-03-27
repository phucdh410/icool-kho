import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Form from "../../../components/Form/Check";

import { update } from "src/apis/inventory_slip.api";
import { getByCode } from "_common/queries-fn/inventory-check.query";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import { correctInventoryCheck } from "_common/correctDataFunctionFormUnitAndPrice";

import { isSuccess } from "src/utils/funcs";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

const InventoryCheckUpdate = ({ match: { params } }) => {
	// #region Data
	const isLoading = useSelector(selectIsLoading);

	const { data } = getByCode(params.code, isLoading);
	// #endregion

	// #region Events
	const onSubmit = async (data) => {
		const _data = correctInventoryCheck(data);

		const res = await update(_data);

		if (isSuccess(res)) {
			history.push("/inventory-check/list");

			noti("success", SUCCESS_MESSAGE.INVENTORY_CHECK.UPDATE);
		} else {
			noti("error", ERROR_MESSAGE.INVENTORY_CHECK.UPDATE);
		}
	};
	// #endregion

	// #region Render
	return (
		<Form isLoading={isLoading} edit={true} data={data} onSubmit={onSubmit} />
	);
	// #endregion
};

export default InventoryCheckUpdate;
