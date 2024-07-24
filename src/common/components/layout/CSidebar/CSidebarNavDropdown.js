import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { matchPath,useLocation } from "react-router-dom";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CSidebarNavDropdown } from "@coreui/react";

import { ability } from "src/configs/ability";
import { ENTITY_GROUP_CODE,PERMISSION_VALUE } from "src/configs/constant";

const selectStoreCode = createSelector(
  (state) => state.auth,
  ({ storeCode }) => storeCode
);

const SidebarNavDropdown = ({ children, childrens, required, ...rest }) => {
  const { pathname } = useLocation();

  const storeCode = useSelector(selectStoreCode);

  const _class = classNames(
    "sidebar-dropdown-custom",
    childrens?.find((c) => matchPath(pathname, c)) && "c-active"
  );

  const canAccess = useMemo(
    () =>
      required?.some(({ permission, code, stores }) => {
        // console.log(
        //   "canAccess",
        //   permission,
        //   code,
        //   PERMISSION_VALUE.READ,
        //   ENTITY_GROUP_CODE.ALL
        // );
        if (
          ability.can(
            permission || PERMISSION_VALUE.READ,
            code || ENTITY_GROUP_CODE.ALL
          )
        ) {
          // if (stores && !stores.includes(storeCode)) return false;
          return true;
        }

        return false;
      }),
    [required]
  );

  return (
    canAccess && (
      <CSidebarNavDropdown {...rest} show={true} className={_class}>
        {children}
      </CSidebarNavDropdown>
    )
  );
};

export default SidebarNavDropdown;
