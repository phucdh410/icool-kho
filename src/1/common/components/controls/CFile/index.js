import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import classNames from "classnames";

import { CFormGroup, CLabel } from "@coreui/react";

import { uploadApi } from "src/apis/upload.api";

export const CFile = forwardRef(
  (
    { label, onChange, className, value, max, onFileClick, render, ...rest },
    ref
  ) => {
    const inputRef = createRef(null);

    const _class = classNames("c-input c-file", className);

    const [_files, setFiles] = useState([]);

    const change = async (e) => {
      const file = e.target.files[0];

      if (file) {
        try {
          const res = await uploadApi.create(file);
          const uploadedFile = res?.data;
          onChange([...value, uploadedFile]);
        } catch (error) {
          noti("error", error?.message ?? "Upload failed!");
        }
      }

      e.target.value = "";
      if (inputRef.current) inputRef.current.value = "";

      // if (max) onChange(files.slice(0, max));
      // else onChange(files);
    };

    const click = useCallback(() => inputRef.current.click(), [inputRef]);

    const onKeyDown = useCallback(
      (e) => e.keyCode === 13 && inputRef.current.click(),
      []
    );

    useEffect(() => setFiles(value), [value]);

    useImperativeHandle(ref, () => ({
      clearList: () => setFiles([]),
    }));

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
                key={file.original_name || file}
                className={classNames("c-icon", "file")}
              ></span>
            )
          )}
        </span>
      </CFormGroup>
    );
  }
);
