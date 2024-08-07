import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
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

const defaultColor = "#252525d1";

export const CSelectColor = forwardRef(
  (
    {
      label,
      onChange,
      className,
      value,
      options,
      ignore,
      display,
      select,
      ...rest
    },
    ref
  ) => {
    const [color, setColor] = useState(defaultColor);

    const _class = classNames("c-input c-select c-select-color", className);

    const _options = useMemo(
      () =>
        options?.filter(
          (o) => !ignore?.includes(o.value) || (value && o.value === value)
        ) ?? [],
      [options, ignore]
    );

    const _value = useMemo(() => {
      if (typeof value === "object" && value !== null) {
        return _options?.find((v) => v.value === value?.value) || null;
      }

      return _options?.find((v) => v.value === value) || null;
    }, [value, _options]);

    const change = useCallback(
      (v) => (select ? onChange(v[select]) : onChange(v)),
      [onChange, select]
    );

    useEffect(() => {
      if (_value) setColor(_value?.color);
      else setColor(defaultColor);
    }, [_value]);

    return (
      <CFormGroup
        className={_class}
        style={{ ...rest?.styles, "--select-color": color }}
      >
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
            getOptionLabel={display ? (option) => option[display] : undefined}
            {...rest}
          />
        )}
      </CFormGroup>
    );
  }
);
