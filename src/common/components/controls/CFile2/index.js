import { forwardRef, createRef, useCallback } from "react";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

import { fileApi } from "src/apis/file.api";

const CFile2 = ({ fields, append, label, className, value, ...rest }, ref) => {
  const inputRef = createRef(null);

  const _class = classNames("c-input c-file", className);

  const onChange = async (e) => {
    const file = e?.target?.files[0];

    if (file) {
      try {
        const res = await fileApi.upload(file);

        const dataFile = res?.data;
        append(dataFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const click = useCallback(() => inputRef.current.click(), [inputRef]);

  const onKeyDown = useCallback(
    (e) => e.keyCode === 13 && inputRef.current.click(),
    []
  );

  return (
    <CFormGroup className={_class}>
      {label && (
        <CLabel>
          {label} {rest.required && <span className="text-danger">*</span>}
        </CLabel>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .jpeg, .png, .pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={onChange}
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
        <span className={classNames("c-icon")}></span>
      </span>
      {fields.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "4px",
            gap: "4px",
          }}
        >
          {fields.map((e) => (
            <a key={e?.id} href={e?.path} rel="noopener noreferrer">
              {e?.name}
            </a>
          ))}
        </div>
      )}
    </CFormGroup>
  );
};

export default forwardRef(CFile2);
