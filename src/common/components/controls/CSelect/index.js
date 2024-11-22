import { forwardRef, useCallback, useMemo } from "react";
import RSelect from "react-select";
import classNames from "classnames";

import { CFormGroup, CInput, CLabel } from "@coreui/react";

const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#053C7F",
  },
});

function Select(
  {
    label,
    onChange,
    className,
    value,
    options,
    ignore,
    display,
    select,
    disabled,
    isDisabled,
    optionAll = false,
    ...rest
  },
  ref
) {
  const _class = classNames("c-input c-select", className);

  const _options = useMemo(() => {
    const result =
      options?.filter(
        (o) => !ignore?.includes(o.value) || (value && o.value === value)
      ) ?? [];
    if (optionAll) {
      return [{ value: "", label: "Tất cả" }, ...result];
    } else {
      return result;
    }
  }, [options, ignore, optionAll]);

  const _value = useMemo(() => {
    if (typeof value === "object" && value !== null) {
      return (
        _options?.find((v) => v[select || "value"] === value?.value) || null
      );
    }

    return _options?.find((v) => v[select || "value"] === value) || null;
  }, [value, _options]);

  const change = useCallback(
    (v) => (select ? onChange(v[select], v) : onChange(v)),
    [onChange, select]
  );

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
          value={(display ? _value?.[display] : _value?.label) ?? ""}
          {...rest}
        />
      ) : (
        <RSelect
          ref={ref}
          className={!!rest.invalid && "is-invalid"}
          value={_value}
          options={_options || []}
          menuPortalTarget={document.body}
          menuPlacement="auto"
          menuShouldScrollIntoView={true}
          theme={selectTheme}
          onChange={change}
          classNamePrefix="react-select"
          isDisabled={disabled || isDisabled}
          getOptionLabel={display ? (option) => option[display] : undefined}
          {...rest}
        />
      )}
    </CFormGroup>
  );
}

export default forwardRef(Select);
