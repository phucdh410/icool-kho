import React, { forwardRef, createRef, useCallback, useState } from "react";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

import { fileApi } from "src/apis/file.api";

const CFile2 = (
  { fields, append, remove, label, className, value, ...rest },
  ref
) => {
  const inputRef = createRef(null);

  const [isUploading, setIsUploading] = useState(false);

  const _class = classNames("c-input c-file", className);

  const onChange = async (e) => {
    const file = e?.target?.files[0];

    if (file) {
      setIsUploading(true);
      try {
        const res = await fileApi.upload(file);

        const dataFile = res?.data;
        append(dataFile);
        inputRef.current = null;
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
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
        {/* <span className={classNames("c-icon")}>
          {isUploading && "Uploading..."}
        </span> */}
        <span className="flex items-center gap-2 h-full">
          <i className="fa-regular fa-cloud-arrow-up"></i>
          {isUploading ? "Uploading..." : "Upload"}
        </span>
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
          {fields.map((e, index) => (
            <div
              className="self-start flex flex-row gap-1 items-center justify-between"
              key={e?.id}
            >
              <a
                href={e?.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left whitespace-nowrap text-ellipsis overflow-hidden max-w-[130px]"
              >
                {e?.originalname}
              </a>
              {remove && (
                <i
                  onClick={remove(index)}
                  className="fa-regular fa-delete-left fa-lg cursor-pointer hover:text-red-600"
                ></i>
              )}
            </div>
          ))}
        </div>
      )}
    </CFormGroup>
  );
};

export default forwardRef(CFile2);
