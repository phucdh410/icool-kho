import { forwardRef, createRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

const File = (
	{ label, onChange, className, value, max, onFileClick, render, ...rest },
	ref
) => {
	const inputRef = createRef(null);

	const _class = classNames("c-input c-file", className);

	const [_files, setFiles] = useState([]);

	const change = useCallback(
		(e) => {
			const files = Array.from(e.target.files);

			if (max) onChange(files.slice(0, max));
			else onChange(files);
		},
		[max]
	);

	const click = useCallback(() => inputRef.current.click(), [inputRef]);

	const onKeyDown = useCallback(
		(e) => e.keyCode === 13 && inputRef.current.click(),
		[]
	);

	useEffect(() => setFiles(value), [value]);

	return (
		<CFormGroup className={_class}>
			{label && (
				<CLabel>
					{label} {rest.required && <span className="text-danger">*</span>}
				</CLabel>
			)}
			<input
				multiple
				style={{ display: "none" }}
				type="file"
				onChange={change}
				ref={inputRef}
				{...rest}
			/>
			<span
				ref={ref}
				tabIndex={0}
				onKeyDown={onKeyDown}
				onClick={click}
				className="form-control"
			>
				{_files?.map((file) =>
					render ? (
						render(file)
					) : (
						<span
							key={file.name || file}
							className={classNames("c-icon", "file")}
						></span>
					)
				)}
			</span>
		</CFormGroup>
	);
};

export default forwardRef(File);
