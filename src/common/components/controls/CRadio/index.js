import { forwardRef } from "react";
import classNames from "classnames";

import "./styles.scss";

export const CRadio = forwardRef(
  (
    { name, value, onChange, direction = "vertical", options = [], ...props },
    ref
  ) => {
    const onInputChange = (event) => {
      onChange?.(event.target.value);
    };
    return (
      <>
        <div
          className={classNames(
            "c-radio flex gap-x-3",
            direction === "horizontal" ? "flex-row" : "flex-col"
          )}
        >
          {options.map((option) => (
            <label key={option?.value} className="radio-item">
              <input
                type="radio"
                name={name}
                checked={option?.value === value}
                value={option?.value}
                onChange={onInputChange}
              />
              <span
                className={classNames(
                  "checkmark",
                  option?.value === value && "checked"
                )}
              ></span>
              <p
                className={classNames("cursor-pointer")}
                onClick={() => onChange(option?.value)}
              >
                {option.label}
              </p>
            </label>
          ))}
        </div>
      </>
    );
  }
);
