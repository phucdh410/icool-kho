import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import jwtDecode from "jwt-decode";
import { createSelector } from "reselect";

import { profile } from "src/apis/auth.api";
import { FirebaseRoot } from "src/firebase";
import { setAuthToken } from "src/utils/axios";

import { logout, setPermission, setUser } from "_common/actions/auth.action";
import { MainLayout } from "_components/layout";
import { AnonymusRoute, PrivateRoute } from "_components/routes";
import { Login } from "_modules/auth/pages";
import { E404 } from "_modules/error/pages";

import { isEmpty } from "./utils/funcs";

import "_assets/css/main.scss";

export const history = createBrowserHistory();

const selectAuth = createSelector(
  (state) => state.auth,
  ({ token }) => ({ token })
);

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);

  useEffect(() => {
    try {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) dispatch({ type: "SET_AUTHENTICATE" });
      loading(true);
      // set Token
      setAuthToken(token);
      // load profile
      profile()
        .then((user) => {
          if (isEmpty(user.permissions)) return dispatch(logout());
          dispatch(setUser(user));
          dispatch(setPermission(user));
        })
        .catch((err) => dispatch({ type: "SET_AUTHENTICATE" }))
        .finally(() => loading(false));
    } catch (err) {
      loading(false);
      return dispatch(logout());
    }
  }, [profile]);

  return (
    <Suspense fallback={<></>}>
      <FirebaseRoot />
      <Router history={history}>
        <Switch>
          <AnonymusRoute
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/404"
            name="Error 404"
            render={(props) => <E404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Error 500"
            render={(props) => <E500 {...props} />}
          />
          <PrivateRoute
            path="/"
            name="Default"
            render={(props) => <MainLayout {...props} />}
          />
        </Switch>
      </Router>

      <Toaster position="top-right" containerClassName="toaster-container" />
    </Suspense>
  );
};

export default App;
