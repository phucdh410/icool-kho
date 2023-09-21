import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarBrand,
  CSidebarNavDivider,
  CSidebarMinimizer,
} from "@coreui/react";

import CSidebarNavDropdown from "./CSidebarNavDropdown";
import CSidebarNavTitle from "./CSidebarNavTitle";
import CSidebarNavItem from "./CSidebarNavItem";

import { createSelector } from "reselect";

import { toggleSidebar as toggleSidebarAction } from "_common/actions/config.action";

import navigation from "src/routes/navigation";

import logo from "_assets/images/180x180.png";

const selectIsShow = createSelector(
  (state) => state.config,
  (config) => config.isShow
);

const MainLayout = () => {
  const dispatch = useDispatch();
  const isShow = useSelector(selectIsShow);

  const toggleSidebar = useCallback(
    (val) => dispatch(toggleSidebarAction(val)),
    [dispatch]
  );

  return (
    <CSidebar minimize show={isShow} onShowChange={toggleSidebar}>
      <CSidebarBrand className={"d-md-down-none justify-content-start"} to="/">
        <div>
          <img src={logo} />
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default MainLayout;
