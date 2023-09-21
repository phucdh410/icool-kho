import { forwardRef, useCallback } from "react";
import classNames from "classnames";

const Checkbox = ({ label, onChange, className, value, ...rest }, ref) => {
	const _class = classNames(
		"custom-control",
		"c-checkbox",
		rest.disabled && "disabled",
		className
	);

	const change = useCallback(
		(e) => e.stopPropagation() || e.preventDefault() || onChange(!value),
		[value, onChange]
	);

	return (
		<div className={_class} onClick={change}>
			<input
				ref={ref}
				type="checkbox"
				className="custom-control-input"
				checked={value ? "checked" : ""}
				onChange={() => {}}
				{...rest}
			/>
			<label className="custom-control-label">{label}</label>
		</div>
	);
};

export default forwardRef(Checkbox);
