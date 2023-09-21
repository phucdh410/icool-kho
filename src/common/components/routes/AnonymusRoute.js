import { useEffect } from "react";
import { Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { history } from "src/App";

const selectAuth = createSelector(
	(state) => state.auth,
	(state) => state.config,
	({ token }, { isLoading }) => ({ token, isLoading })
);

function AnonymusRoute({ render: Render }) {
	const { token, isLoading } = useSelector(selectAuth);

	useEffect(() => {
		if (isLoading === false && token) history.push("/");
	}, [isLoading]);

	return (
		<>
			{isLoading === false && !token && (
				<Route render={(props) => <Render {...props} />} />
			)}
		</>
	);
}

export default AnonymusRoute;
