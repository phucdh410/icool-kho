import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { matchPath,useLocation } from "react-router-dom";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CSidebarNavItem } from "@coreui/react";

import { ability } from "src/configs/ability";
import { ENTITY_GROUP_CODE, PERMISSION_VALUE } from "src/configs/constant";

const selectStoreCode = createSelector(
  (state) => state.auth,
  ({ storeCode }) => storeCode
);

const SidebarNavItem = ({ children, childrens, required, store, ...rest }) => {
  const { pathname } = useLocation();

  const storeCode = useSelector(selectStoreCode);

  const _class = classNames(
    "sidebar-item-custom",
    childrens?.find((c) => matchPath(pathname, c)) && "c-active"
  );

  const canAccess = useMemo(
    () =>
      required?.some(({ permission, code, stores }) => {
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
    [required, store]
  );

  return (
    canAccess && (
      <CSidebarNavItem {...rest} className={_class}>
        {children}
      </CSidebarNavItem>
    )
  );
};

export default SidebarNavItem;
