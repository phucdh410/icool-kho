import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import MForm from "../../components/Form";

import { getByCode } from "_common/queries-fn/purchase-slip.query";
import { update } from "src/apis/purchase_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import { correctImport } from "src/common/correctDataFunctionFormUnitAndPrice";

import { isSuccess } from "src/utils/funcs";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

const ImportUpdate = ({ match: { params } }) => {
	const isLoading = useSelector(selectIsLoading);

	const { data } = getByCode(params.code, isLoading);

	const onSubmit = async (data) => {
		const _data = correctImport(data);

		const res = await update(_data);

		if (isSuccess(res)) {
			history.push("/import/list");
			noti("success", SUCCESS_MESSAGE.IMPORT.UPDATE);
		} else {
			noti("error", ERROR_MESSAGE.IMPORT.UPDATE);
		}
	};

	return (
		<>
			<MForm
				edit={true}
				data={data}
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</>
	);
};

export default ImportUpdate;
