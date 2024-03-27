import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { logout } from "src/common/actions/auth.action";

import { history } from "src/App";
import { ENTITY_GROUP_CODE } from "src/configs/constant";

const selectPermissions = createSelector(
	(state) => state.auth,
	({ permissions }) => permissions
);

const priority = {
	[ENTITY_GROUP_CODE.BACKLOG_SLIP]: "/inventory-slip/list",
	[ENTITY_GROUP_CODE.INVENTORY_SLIP]: "/inventory-check/list",
	[ENTITY_GROUP_CODE.EXPORT_SLIP]: "/export/list",
	[ENTITY_GROUP_CODE.PURCHASE_SLIP]: "/import/list",
	[ENTITY_GROUP_CODE.ALL]: "/summary/export",
};

const Redirect = ({}) => {
	const dispatch = useDispatch();

	const permissions = useSelector(selectPermissions);

	useEffect(() => {
		const _permissions = Object.values(permissions);

		if (!_permissions.length) dispatch(logout());

		for (let key in priority) {
			if (permissions[key] & 1) return history.push(priority[key]);
		}

		return dispatch(logout());
	}, [permissions]);

	return <></>;
};

export default Redirect;
