import { forwardRef, useState } from "react";
import classNames from "classnames";

export const CRating = forwardRef(
  ({ value = 1, onChange, max = 10, disabled = false }, ref) => {
    //#region Data
    const [displayValue, setDisplayValue] = useState({
      value: value ?? 1,
      total: max ?? 10,
    });
    //#endregion

    //#region Event
    const onMouseEnter = (hoverIndex) => () => {
      setDisplayValue((prev) => ({ ...prev, value: hoverIndex }));
    };

    const onMouseLeave = () => {
      setDisplayValue((prev) => ({ ...prev, value }));
    };

    const onStarClick = (newValue) => () => {
      setDisplayValue((prev) => ({ ...prev, value: newValue }));
      onChange?.(newValue);
    };
    //#endregion

    //#region Render
    return (
      <div className="grid grid-cols-5 w-[135px]">
        {Array(displayValue.total)
          .fill("")
          .map((e, index) => (
            <i
              key={index}
              onMouseEnter={!disabled ? onMouseEnter(index + 1) : undefined}
              onMouseLeave={!disabled ? onMouseLeave : undefined}
              onClick={!disabled ? onStarClick(index + 1) : undefined}
              className={classNames(
                displayValue.value >= index + 1 ? "fa-solid" : "fa-regular",
                disabled
                  ? "cursor-default text-[#0070c480]"
                  : "cursor-pointer text-[#0071c7]",
                "text-[24px] fa-star transition-all duration-100"
              )}
            ></i>
          ))}
      </div>
    );
    //#endregion
  }
);
