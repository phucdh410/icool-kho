import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { create } from "src/apis/inventory_slip.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { isSuccess } from "src/utils/funcs";

import { correctInventoryCheck } from "_common/correctDataFunctionFormUnitAndPrice";

import Form from "../../../components/Form/Check";

const selectCurrentUser = createSelector(
	(state) => state.auth,
	({ user }) => user
);

const InventoryCheckCreate = () => {
	const user = useSelector(selectCurrentUser);

	const [data] = useState({
		createdBy: user.code,
		storeCode: user.storeCode,
		wareCode: user.wareCode,
		checked: new Date(),
		note: "",
		groupCode: ""
	});

	const onSubmit = async (data) => {
		const _data = correctInventoryCheck(data);

		const res = await create(_data);

		if (isSuccess(res)) {
			history.push("/inventory-check/list");

			noti("success", SUCCESS_MESSAGE.INVENTORY_CHECK.CREATE);
		} else {
			noti("error", ERROR_MESSAGE.INVENTORY_CHECK.CREATE);
		}
	};

	return <Form edit={false} onSubmit={onSubmit} data={data} />;
};

export default InventoryCheckCreate;
