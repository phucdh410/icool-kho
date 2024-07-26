import { forwardRef, useEffect, useRef } from "react";
import classNames from "classnames";

import "./styles.scss";

export const CRange = forwardRef(
  (
    {
      className,
      min = 0,
      max = 100,
      value,
      onChange,
      showPercent = true,
      fillColor = "#FFB946",
      emptyColor = "#d3d8dd",
      ...props
    },
    ref
  ) => {
    //#region Event
    const onSliderChange = (e) => {
      onChange(Number(e.target.value));
    };

    //#endregion

    //#region Render
    return (
      <div className="c-range-wrapper flex items-center gap-3">
        <input
          ref={ref}
          value={value}
          onChange={onSliderChange}
          type="range"
          min={min}
          max={max}
          aria-valuenow={value}
          className={classNames("c-range relative bg-[#d3d8dd]", className)}
          style={{ "--range-value": value, "--range-fill-color": fillColor }}
        />
        {showPercent && (
          <span className="font-semibold shrink-0 !w-10">{`${value}%`}</span>
        )}
      </div>
    );
    //#endregion
  }
);
