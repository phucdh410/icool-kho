import { login as loginApi } from "src/apis/auth.api";
import { history } from "src/App";
import { setAuthToken } from "src/utils/axios";

import {
  CLEAR_TABS,
  SET_AUTHENTICATE,
  SET_CURRENT_USER,
  SET_PERMISSION,
  SET_TABS,
} from "./_types";

const setAuthenticate = (token = null) => ({
  type: SET_AUTHENTICATE,
  payload: token,
});

export const setUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setPermission = ({
  role_code,
  store_code,
  ware_code,
  permissions,
}) => ({
  type: SET_PERMISSION,
  payload: {
    role_code,
    store_code,
    ware_code,
    permissions,
  },
});

export const login =
  ({ username, password }, fcallback) =>
  async (dispatch) => {
    try {
      const res = await loginApi(username, password);

      if (!res) return fcallback(false);

      await dispatch(setAuthenticate(res.token));

      setAuthToken(res.token);

      return fcallback(true);
    } catch {
      fcallback(false);
    }
  };

export const logout = () => async (dispatch) => {
  dispatch(setAuthenticate());
  dispatch({ type: SET_TABS, payload: {} });
  dispatch({ type: CLEAR_TABS, payload: "ALL" });

  history.push("/login");
};
