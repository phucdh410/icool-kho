import { forwardRef, useCallback, useMemo, useState } from "react";

import classNames from "classnames";

import { CInput, CFormGroup, CLabel } from "@coreui/react";

import { EyeOpen, EyeClose, XCircleFill } from "_assets/icons";

function Input({ label, onChange, className, value, type, ...rest }, ref) {
	const [isShow, setShow] = useState(false);

	const _class = classNames("c-input", className);

	const toggleShow = useCallback(() => setShow(!isShow), [isShow]);

	const change = useCallback((e) => onChange(e.target.value), [onChange]);

	const clear = useCallback((e) => {
		e.target.closest("div").querySelector("input").value = "";
		onChange("");
	}, []);

	const renderExtend = useMemo(
		() => () =>
			!!value && (
				<span className="extends">
					{type === "password" &&
						(isShow ? (
							<EyeOpen className="icon" onClick={toggleShow} />
						) : (
							<EyeClose className="icon" onClick={toggleShow} />
						))}
					<XCircleFill onClick={clear} />
				</span>
			),
		[value, isShow]
	);

	return (
		<CFormGroup className={_class}>
			{label && (
				<CLabel>
					{label} {rest.required && <span className="text-danger">*</span>}
				</CLabel>
			)}
			<div>
				{type === "password" ? (
					<CInput
						innerRef={ref}
						type={isShow ? "text" : type}
						className="custom password"
						onChange={change}
						{...rest}
					/>
				) : (
					<CInput
						innerRef={ref}
						type={type}
						value={value || ""}
						className="custom input"
						onChange={change}
						{...rest}
					/>
				)}
				{!rest.disabled &&
					!rest.readOnly &&
					type !== "number" &&
					renderExtend(value)}
			</div>
		</CFormGroup>
	);
}

export default forwardRef(Input);
