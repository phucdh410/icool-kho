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
  "Tab",
];

const THOUSAND_SEPARATOR = {
  ",": "en-US",
  ".": "vi-VN",
};

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
      thousand_seperator = ",",
      ...rest
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const _class = classNames("c-input c-number", className);

    const displayValue = useMemo(() => {
      if (!value) return 0;

      if (!currency) {
        return value.toLocaleString(THOUSAND_SEPARATOR[thousand_seperator]);
      } else {
        if (isFocus) {
          return value.toLocaleString(THOUSAND_SEPARATOR[thousand_seperator]);
        } else {
          return `${value.toLocaleString(
            THOUSAND_SEPARATOR[thousand_seperator]
          )}${currency}`;
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

      if (tmpValue?.includes(thousand_seperator)) {
        tmpValue = tmpValue.replaceAll(thousand_seperator, "");
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
