import { useCallback, forwardRef, useMemo } from "react";
import classNames from "classnames";

import RSelect from "react-select";
import { CFormGroup, CLabel, CInput } from "@coreui/react";

const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#053C7F",
  },
});

function Select(
  { label, onChange, className, value, options, canWrap = false, ...rest },
  ref
) {
  const _class = classNames("c-input c-select", className);

  const _value = useMemo(
    () => value?.map((v) => options?.find((o) => o.value === v)) || [],
    [value, options]
  );

  const change = useCallback((v) => onChange(v), [onChange]);

  return (
    <CFormGroup className={_class}>
      {label && (
        <CLabel>
          {label} {rest.required && <span className="text-danger">*</span>}
        </CLabel>
      )}
      {rest.readOnly ? (
        <CInput
          className="c-input"
          value={_value.map((v) => v.label)}
          {...rest}
        />
      ) : (
        <RSelect
          ref={ref}
          isMulti
          className={(!!rest.invalid && "is-invalid", canWrap && "can-wrap")}
          value={_value}
          options={options || []}
          menuPortalTarget={document.body}
          menuPlacement="auto"
          menuShouldScrollIntoView={true}
          theme={selectTheme}
          onChange={change}
          classNamePrefix="react-select-multi"
          {...rest}
        />
      )}
    </CFormGroup>
  );
}

export default forwardRef(Select);
