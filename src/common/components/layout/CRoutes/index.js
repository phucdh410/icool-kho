import React from "react";
import { Route,Switch } from "react-router-dom";

import routes from "src/routes";

import { Redirect } from "_components/routes";

const Routes = () => {
	return (
		<Switch>
			{routes.map((r) =>
				r.redirect ? (
					<Redirect
						key={`_${r.redirect}`}
						exact={r.exact}
						from={r.from}
						to={r.redirect}
					/>
				) : (
					<Route
						key={r.path}
						path={r.path}
						exact={r.exact}
						name={r.name}
						extend={r.extend}
						render={(q) => <r.component {...q} />}
					/>
				)
			)}
			{/* <Redirect to="/404" /> */}
		</Switch>
	);
};

export default Routes;
