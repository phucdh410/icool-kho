import { forwardRef } from "react";
import ReactSwitch from "react-switch";

export const CSwitch = forwardRef(({ label, value, ...props }, ref) => {
  return (
    <label className="my-c-switch">
      <span>Trạng thái</span>
      <ReactSwitch ref={ref} checked={!!value} {...props} />
    </label>
  );
});

CSwitch.displayName = "CSwitch";
