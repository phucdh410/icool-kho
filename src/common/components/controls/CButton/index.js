import { forwardRef } from "react";
import classNames from "classnames";

import { CButton } from "@coreui/react";

const Button = ({ children, icon, color, className, ...rest }, ref) => {
  const _class = classNames(
    "c-button",
    !icon && "justify-content-center",
    className
  );

  return (
    <CButton
      innerRef={ref}
      className={_class}
      color={color || "primary"}
      shape="pill"
      {...rest}
    >
      {icon && icon}
      <span>{children}</span>
    </CButton>
  );
};

export default forwardRef(Button);
