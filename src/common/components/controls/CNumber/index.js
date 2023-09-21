import { forwardRef, useCallback, useMemo, useRef } from "react";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

function InputNumber(
	{ label, onChange, className, value, isFloat, min, max, ...rest },
	ref
) {
	const _class = classNames("c-input c-number", className);

	const parser = useMemo(() => (isFloat ? parseFloat : parseInt), [isFloat]);

	const _min = useMemo(() => parseFloat(min) || 0, [min]);

	const _max = useMemo(() => parseFloat(max) || 999999, [max]);

	const prevKey = useRef(null);

	const test = useCallback(
		(value) => {
			return (
				(isFloat && /^\d+(((\.\d{1,3}$)|$)|\.$)/.test(value)) ||
				(!isFloat && /^-?\d*$/.test(value))
			);
		},
		[isFloat]
	);

	const onKeyDown = (e) => {
		if (prevKey.current + e.key == "--")
			e.preventDefault(), e.stopPropagation();

		if (
			((prevKey.current === "Meta" || prevKey.current === "Control") &&
				e.key === "a") ||
			e.key.length > 2
		)
			return (prevKey.current = e.key);

		let input = e.target.value + e.key;

		if (input === "-") input = -1;

		const nextValue = parser(input);

		if (_min > nextValue || nextValue > _max)
			e.preventDefault(), e.stopPropagation();

		if (!test(input)) e.preventDefault(), e.stopPropagation();

		prevKey.current = e.key;
	};

	const change = useCallback(
		(e) => {
			e.preventDefault(), e.stopPropagation();
			const value = e.target.value;

			if (value === "") return onChange(0);

			if (_min <= parser(value) && parser(value) <= _max) onChange(value);
		},
		[_min, _max, isFloat, onChange]
	);

	return (
		<CFormGroup className={_class}>
			{label && (
				<CLabel>
					{label} {rest.required && <span className="text-danger">*</span>}
				</CLabel>
			)}
			<input
				ref={ref}
				type="number"
				value={value || ""}
				className="form-control"
				onKeyDown={onKeyDown}
				onChange={change}
				{...rest}
			/>
		</CFormGroup>
	);
}

export default forwardRef(InputNumber);
