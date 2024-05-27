import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CHeader, CToggler, CHeaderNav, CSubheader } from "@coreui/react";

import CAccount from "../CAccount";
import { Notification } from "./Notification";
import CTabs from "./CTabs";

import { toggleSidebar as toggleSidebarAction } from "_common/actions/config.action";

const selectIsShow = createSelector(
  (state) => state.config,
  (config) => config.isShow
);

const Header = () => {
  const dispatch = useDispatch();
  const isShow = useSelector(selectIsShow);

  const toggleSidebar = useCallback(() => {
    dispatch(
      toggleSidebarAction(
        [false, "responsive"].includes(isShow) ? true : "responsive"
      )
    );
  }, [dispatch, isShow]);

  return (
    <CHeader withSubheader>
      <CToggler
        className="ml-md-3 d-lg-none"
        inHeader
        onClick={toggleSidebar}
      ></CToggler>
      <CHeaderNav className="mr-auto"></CHeaderNav>
      <CHeaderNav className="px-0 px-md-4">
        <Notification />
        <CAccount />
      </CHeaderNav>
      <CSubheader className="w-100">
        <CTabs />
      </CSubheader>
    </CHeader>
  );
};

export default Header;
