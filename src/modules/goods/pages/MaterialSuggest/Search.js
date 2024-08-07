import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { CCol,CRow } from "@coreui/react";

import { STATUS_OPTIONS } from "src/configs/constant";

import { CInput, CSelect } from "_components/controls";

let _timeout = null;

export default ({ onSearch }) => {
  const { control, watch, getValues } = useForm({ mode: "onChange" });

  useEffect(() => {
    clearTimeout(_timeout);
    _timeout = setTimeout(() => onSearch(getValues()), 500);
    return () => clearTimeout(_timeout);
  }, [watch("code"), watch("name")]);

  return (
    <CRow>
      <CCol xs="12">
        <h5 className="text-icool-blue text-center">
          DANH SÁCH ĐỀ XUẤT NGUYÊN VẬT LIỆU
        </h5>
      </CCol>
      <CCol xs="12" sm="6" md="4" lg="4" xl="3" style={{ maxWidth: "250px" }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <CSelect
              label="Trạng thái"
              placeholder="Tất cả"
              options={STATUS_OPTIONS}
              {...field}
              onChange={({ value }) => field.onChange(value)}
            ></CSelect>
          )}
        />
      </CCol>
      <CCol xs="12" sm="12" md="6" lg="6" xl="6" style={{ maxWidth: "250px" }}>
        <Controller
          name="code"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CInput label="Mã NVL" placeholder="Lọc theo mã" {...field} />
          )}
        />
      </CCol>
      <CCol xs="12" sm="12" md="6" lg="6" xl="6" style={{ maxWidth: "450px" }}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CInput label="Tên NVL" placeholder="Lọc theo tên" {...field} />
          )}
        />
      </CCol>
    </CRow>
  );
};
