// https://reactdatepicker.com/#example-custom-input
import { forwardRef, useMemo } from "react";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import dayjs from "dayjs";
import moment from "moment";

import { CFormGroup, CInput, CLabel } from "@coreui/react";

import { Calendar } from "_assets/icons";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(
  ({ value, onClick, invalid, onChange, ...rest }, ref) => (
    <>
      <CInput
        innerRef={ref}
        onClick={onClick}
        value={value}
        onChange={onChange}
        invalid={invalid}
        autoComplete="off"
        {...rest}
      />
      <Calendar onClick={onClick} className="c-icon" />
    </>
  )
);

const InputDate = ({ label, onChange, className, value, ...rest }, ref) => {
  const _class = classNames("c-input-date", className);

  const validValue = useMemo(() => dayjs(value).toDate(), [value]);

  const formatedDate = useMemo(
    () => dayjs(validValue).format("DD/MM/yyyy"),
    [validValue]
  );

  return (
    <CFormGroup className={_class}>
      {label && (
        <CLabel>
          {label} {rest.required && <span className="text-danger">*</span>}
        </CLabel>
      )}
      {rest.readOnly ? (
        <CInput value={formatedDate} {...rest} />
      ) : (
        <DatePicker
          ref={ref}
          selected={validValue}
          onChange={onChange}
          timeInputLabel={label}
          dateFormat="dd/MM/yyyy"
          placeholderText={rest.placeholder}
          customInput={<CustomInput invalid={rest.invalid} />}
          autoComplete="off"
          {...rest}
        />
      )}
    </CFormGroup>
  );
};

export default forwardRef(InputDate);
