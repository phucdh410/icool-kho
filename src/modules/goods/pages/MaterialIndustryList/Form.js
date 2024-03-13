import React, { forwardRef, useImperativeHandle } from "react";

import { Controller, useForm } from "react-hook-form";

import { CRow, CCol, CCard, CCardBody, CSwitch } from "@coreui/react";

import { CInput } from "_components/controls";

export default forwardRef(({}, ref) => {
  const { control, reset, handleSubmit } = useForm();

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
      clear: (data = {}) => reset(data),
    }),
    []
  );

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="code"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Mã Ngành NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="7" style={{ minWidth: "250px" }}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Tên Ngành NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="viet_tat"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Viết tắt Ngành NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="7" style={{ minWidth: "250px" }}>
              <Controller
                control={control}
                name="ghi_chu"
                render={({ field }) => <CInput label="Ghi chú" {...field} />}
              />
            </CCol>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="viet_tat"
                rules={{ required: true }}
                render={({ field: { ref, ..._field } }) => (
                  <CSwitch label="Trạng thái" title="Xin chào" {..._field} />
                )}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
});
