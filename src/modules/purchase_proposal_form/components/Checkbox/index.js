import { forwardRef,useState } from "react";
import classNames from "classnames";

import "../../assets/css/checkbox.scss";

const Checkbox = ({ label, onChange, className, disabled, ...rest }, ref) => {
	const [checked, setChecked] = useState(false);
	const change = (e) => {
		if (disabled) return;
		onChange && onChange(!checked);
		setChecked(!checked);
	};
	const _class = classNames(
		"form-group c-input",
		"module",
		disabled && "disabled",
		className
	);
	return (
		<div className={_class}>
			<div>
				<input
					ref={ref}
					type="checkbox"
					className="custom-control-input"
					checked={checked}
					onChange={(e) => {}}
					{...rest}
				/>
				<span className="checkmark" onClick={change}></span>
				<div className="custom-control-label" onClick={change}>
					<span>{label}</span>
				</div>
			</div>
		</div>
	);
};

export default forwardRef(Checkbox);
