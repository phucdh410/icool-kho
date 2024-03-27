import { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { pushToTab } from "_common/actions/config.action";

const selectAuth = createSelector(
	(state) => state.auth,
	(state) => state.config,
	({ token, storeCode }, { isLoading }) => ({ token, storeCode, isLoading })
);

function PrivateRoute({ render: Render }) {
	const dispatch = useDispatch();
	const location = useLocation();

	const { token, storeCode, isLoading } = useSelector(selectAuth);

	useEffect(
		() => isLoading === false && dispatch(pushToTab(location, storeCode)),
		[isLoading, location]
	);

	return (
		<>
			{isLoading === false && token && (
				<Route render={(props) => <Render {...props} />}></Route>
			)}
		</>
	);
}

export default PrivateRoute;
