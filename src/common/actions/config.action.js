import {
  SET_LOADING,
  SET_SIDEBAR,
  SET_TABS,
  PUSH_NOTI,
  REMOVE_NOTI,
  SET_FILTER,
  CLEAR_TABS,
} from "./_types";

import { matchPath } from "react-router-dom";

import routes from "src/routes/index";

import { ability } from "_configs/ability";

import { history } from "src/App";

export const toggleLoading = (isLoading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: isLoading,
  });
};

export const toggleSidebar = (isShow) => (dispatch) => {
  dispatch({
    type: SET_SIDEBAR,
    payload: isShow,
  });
};

export const pushToTab =
  ({ pathname }, storeCode) =>
  async (dispatch, getStore) => {
    const mapTo = routes.find((route) => {
      return matchPath(pathname, { path: route.path, exact: true });
    });

    if (!mapTo) return;
    const {
      reducer,
      path,
      name,
      required: { permission, code, store },
    } = mapTo;
    const { tabs } = getStore()["config"];

    if (!ability.can(permission, code)) return history.goBack();

    if (store && !store.includes(storeCode)) return history.goBack();

    dispatch({
      type: SET_TABS,
      payload: {
        ...tabs,
        [path]: { current: pathname, path: path, name: name, reducer },
      },
    });
  };

export const removeFromTab = (path) => async (dispatch, getStore) => {
  const { tabs } = getStore()["config"];

  if (!tabs[path]) return;

  const index = Object.keys(tabs).indexOf(path);

  const removedTab = tabs[path];

  removedTab.reducer &&
    dispatch({
      type: CLEAR_TABS,
      payload: { component: removedTab.reducer },
    });

  delete tabs[path];

  dispatch({ type: SET_TABS, payload: { ...tabs } });

  const keys = Object.keys(tabs);

  if (keys.length === 0) return "/";
  return tabs[keys[Math.max(index - 1, 0)]].current;
};

export const pushNoti = (status, title = "", message = "") => {
  return async (dispatch) =>
    dispatch({
      type: PUSH_NOTI,
      payload: {
        no: new Date().getTime(),
        autohide: 1500,
        status,
        title,
        message,
      },
    });
};

export const removeNoti = (index) => {
  return async (dispatch) =>
    dispatch({
      type: REMOVE_NOTI,
      payload: index,
    });
};

export const setFilter = (component, filters) => {
  return async (dispatch) =>
    dispatch({
      type: SET_FILTER,
      payload: { component, filters },
    });
};
