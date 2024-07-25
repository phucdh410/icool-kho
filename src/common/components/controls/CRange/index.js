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
          onChange={onSliderChange}
          type="range"
          min={min}
          max={max}
          className={classNames("c-range relative", className)}
          style={{
            background: `linear-gradient(90deg, #FFB946 ${value}%, #d3d8dd ${value}%)`,
          }}
        />
        {showPercent && <span className="font-semibold">{`${value}%`}</span>}
      </div>
    );
    //#endregion
  }
);
