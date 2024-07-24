import React from "react";
import classNames from "classnames";

import { CSidebarNavTitle } from "@coreui/react";

const SidebarNavTitle = ({ children, ...rest }) => {
  const _class = classNames("sidebar-title-custom");

  return (
    <CSidebarNavTitle {...rest} show={true} className={_class}>
      {children}
    </CSidebarNavTitle>
  );
};

export default SidebarNavTitle;
