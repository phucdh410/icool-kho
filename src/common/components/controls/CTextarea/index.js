import { forwardRef, useCallback, useMemo } from "react";
import classNames from "classnames";

import { CFormGroup, CLabel, CTextarea } from "@coreui/react";

function Input(
  { label, onChange, className, value, type, minHeight, ...rest },
  ref
) {
  const _class = classNames("c-input", className);

  const change = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <CFormGroup className={_class}>
      {label && (
        <CLabel>
          {label} {rest.required && <span className="text-danger">*</span>}
        </CLabel>
      )}
      <div>
        <CTextarea
          innerRef={ref}
          type={type}
          value={value || ""}
          className="custom input"
          onChange={change}
          style={{ minHeight }}
          {...rest}
        />
      </div>
    </CFormGroup>
  );
}

export default forwardRef(Input);
