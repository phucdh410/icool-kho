import { useDispatch } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";

import { history } from "src/App";

import { removeFromTab } from "../../common/actions/config.action";

export const useTabs = (path) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const offCurrentTab = () => {
    dispatch(removeFromTab(path, pathname)).then(
      (_path) =>
        (matchPath(pathname, path) || _path === "/") && history.push(_path)
    );
  };

  return { offCurrentTab };
};
