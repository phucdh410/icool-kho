import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Form from "../../../components/Form/Cancellation";

import { create } from "src/apis/cancellation_slip.api";

import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

const selectCurrentUser = createSelector(
	(state) => state.auth,
	({ user }) => user
);

const InventoryCancelCreate = () => {
	const user = useSelector(selectCurrentUser);

	const [data] = useState({
		createdBy: user.code,
		storeCode: user.storeCode,
		wareCode: user.wareCode,
		checked: new Date(),
		note: "",
	});

	const onSubmit = async (data) => {
		const res = await create(data);

		if (res.exitcode == 200) {
			history.push("/inventory-cancel/list");
			noti("success", SUCCESS_MESSAGE.INVENTORY_CANCEL.UPDATE);
		} else {
			noti("error", ERROR_MESSAGE.INVENTORY_CANCEL.UPDATE);
		}
	};

	return <Form onSubmit={onSubmit} data={data} />;
};

export default InventoryCancelCreate;
