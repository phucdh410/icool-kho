import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { createSelector } from "reselect";

import { history } from "src/App";

import { X } from "_assets/icons";

import { removeFromTab } from "../../../actions/config.action";

const selectTabs = createSelector(
  (state) => state.config,
  ({ tabs }) => Object.values(tabs)
);

function Tabs() {
  const dispatch = useDispatch();
  const tabs = useSelector(selectTabs);
  const { pathname } = useLocation();

  const remove = (path) => (e) => {
    e.preventDefault();
    dispatch(removeFromTab(path, pathname)).then(
      (_path) =>
        (matchPath(pathname, path) || _path === "/") && history.push(_path)
    );
  };

  return (
    <div className="header-nav-tabs tabs">
      <div ref={scroll}>
        <ul className="nav nav-tabs">
          {tabs &&
            tabs.map(({ current, path, name }) => (
              <li
                key={path}
                className={classNames(
                  "nav-item",
                  matchPath(pathname, { path: path, exact: true }) && "active"
                )}
              >
                <NavLink
                  exact={true}
                  activeClassName="active"
                  className="nav-link"
                  to={current}
                >
                  {name}
                  <label onClick={remove(path)} className="close-btn">
                    <X />
                  </label>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
