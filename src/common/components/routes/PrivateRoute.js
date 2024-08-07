import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import { createSelector } from "reselect";

import { pushToTab } from "_common/actions/config.action";

const selectAuth = createSelector(
  (state) => state.auth,
  (state) => state.config,
  ({ token, store_code }, { isLoading }) => ({ token, store_code, isLoading })
);

function PrivateRoute({ render: Render }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, store_code, isLoading } = useSelector(selectAuth);

  useEffect(
    () => isLoading === false && dispatch(pushToTab(location, store_code)),
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
