import { useCallback, forwardRef, useMemo, useEffect } from "react";
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
	{ label, onChange, className, value, options, ignore, ...rest },
	ref
) {
	const _class = classNames("c-input c-select", className);

	const _options = useMemo(
		() =>
			options?.filter(
				(o) => !ignore?.includes(o.value) || (value && o.value === value)
			) ?? [],
		[options, ignore]
	);

	const _value = useMemo(
		() => _options?.find((v) => v.value === value) || null,
		[value, _options]
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
				<CInput className="c-input" value={_value?.label ?? ""} {...rest} />
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
					{...rest}
				/>
			)}
		</CFormGroup>
	);
}

export default forwardRef(Select);
