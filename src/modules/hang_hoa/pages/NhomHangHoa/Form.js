import { forwardRef, useImperativeHandle, useMemo } from "react";

import { Controller, useController, useForm } from "react-hook-form";

import { CRow, CCol, CCard, CCardBody } from "@coreui/react";

import { CInput, CSelect, CSwitch } from "_components/controls";
import { getAll } from "_common/queries-fn/material-industry.query";

export default forwardRef(({}, ref) => {
  //#region Data
  const { control, reset, handleSubmit } = useForm();

  const {
    field: { onChange: changeCode },
  } = useController({ control, name: "industryCode" });
  const {
    field: { onChange: changeName },
  } = useController({ control, name: "industryName" });

  const { data } = getAll({ name: "", code: "" });

  const industryCodes = useMemo(() => {
    if (data && data?.length > 0) {
      return data.map((e) => ({ value: e?.code, label: e?.code }));
    } else return [];
  }, [data]);

  const industryNames = useMemo(() => {
    if (data && data?.length > 0) {
      return data.map((e) => ({ value: e?.code, label: e?.name }));
    } else return [];
  }, [data]);
  //#endregion

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
      clear: (data = {}) => reset(data),
    }),
    []
  );

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="industryCode"
                rules={{ required: true }}
                render={({ field: { onChange, ..._field } }) => (
                  <CSelect
                    label="Mã Ngành NVL"
                    options={industryCodes}
                    onChange={(selectedOpt) => {
                      onChange(selectedOpt?.value);
                      changeName(selectedOpt?.value);
                    }}
                    {..._field}
                    required
                  />
                )}
              />
            </CCol>
            <CCol xl="7" style={{ minWidth: "250px" }}>
              <Controller
                control={control}
                name="industryName"
                rules={{ required: true }}
                render={({ field: { onChange, ..._field } }) => (
                  <CSelect
                    label="Tên Ngành NVL"
                    options={industryNames}
                    onChange={(selectedOpt) => {
                      onChange(selectedOpt?.value);
                      changeCode(selectedOpt?.value);
                    }}
                    {..._field}
                    required
                  />
                )}
              />
            </CCol>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="code"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Mã Nhóm NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="7" style={{ minWidth: "250px" }}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Tên Nhóm NVL" {...field} required />
                )}
              />
            </CCol>
            <CCol xl="5" style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="acronym"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Viết tắt Nhóm NVL" {...field} required />
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
                name="active"
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
  //#endregion
});
