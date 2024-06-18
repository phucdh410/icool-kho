import { forwardRef, useMemo, useState } from "react";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

const allowedKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
];

export const CNumberInput = forwardRef(
  (
    {
      label,
      onChange,
      className,
      value,
      min = 0,
      max = 99999999,
      required = false,
      currency = "",
      ...rest
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const _class = classNames("c-input c-number", className);

    const displayValue = useMemo(() => {
      if (!value) return 0;

      if (!currency) {
        return value.toLocaleString("vi-VN");
      } else {
        if (isFocus) {
          return value.toLocaleString("vi-VN");
        } else {
          return `${value.toLocaleString("vi-VN")}${currency}`;
        }
      }
    }, [value, isFocus, currency]);

    const onKeyDown = (event) => {
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    const onValueChange = (e) => {
      let tmpValue = e.target.value;

      if (tmpValue?.includes(".")) {
        tmpValue = tmpValue.replaceAll(".", "");
      }

      onChange(Number(tmpValue));
    };

    const onFocus = (event) => {
      setIsFocus(true);
    };

    const onBlur = (event) => {
      setIsFocus(false);
    };

    return (
      <CFormGroup className={_class}>
        {label && (
          <CLabel>
            {label} {required && <span className="text-danger">*</span>}
          </CLabel>
        )}
        <input
          ref={ref}
          type="text"
          value={displayValue || 0}
          className="form-control"
          onKeyDown={onKeyDown}
          onChange={onValueChange}
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </CFormGroup>
    );
  }
);
