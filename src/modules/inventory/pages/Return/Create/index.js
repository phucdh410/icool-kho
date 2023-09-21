import { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import Form from "../../../components/Form/Cancellation";

const selectCurrentUser = createSelector(
	(state) => state.auth,
	({ user }) => user
);

const InventoryReturnCreate = () => {
	const user = useSelector(selectCurrentUser);

	const [data] = useState({
		createdBy: user.code,
		storeCode: user.storeCode,
		wareCode: user.wareCode,
		checked: new Date(),
		note: "",
	});

	const onSubmit = (data) => {};

	return <Form edit={false} onSubmit={onSubmit} data={data} />;
};

export default InventoryReturnCreate;
