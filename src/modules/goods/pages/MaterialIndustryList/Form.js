import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";

import { CCard, CCardBody,CCol, CRow } from "@coreui/react";

import { CInput, CSwitch } from "_components/controls";

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
                name="acronym"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Viết tắt Ngành NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="7" style={{ minWidth: "250px" }}>
              <Controller
                control={control}
                name="note"
                render={({ field }) => <CInput label="Ghi chú" {...field} />}
              />
            </CCol>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSwitch label="Trạng thái" {...field} />
                )}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
});
