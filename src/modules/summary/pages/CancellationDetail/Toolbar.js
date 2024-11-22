import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import { CCol, CRow } from "@coreui/react";

import { exportReportDetail } from "src/apis/cancellation_slip.api";
import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CSelect, CSelectMulti } from "_components/controls";

export default ({ filter, stores, onSearch }) => {
  //#region Data
  const { control, setValue, getValues, handleSubmit } = useForm({
    defaultValues: filter,
  });
  //#endregion

  //#region Event
  const search = handleSubmit(
    (d) => onSearch(filterFn(d)),
    (e) => noti("error", e)
  );

  const onStoreChange = (value) =>
    setValue(
      "storeIds",
      value?.map((v) => v.value)
    );

  const onReponsibleChange = useCallback(({ value }) => {
    setValue("responsible", value);
  });

  const onExport = useCallback(() => {
    exportReportDetail(getValues());
  });
  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" className="justify-content-end action">
          <div className="text-right">
            <CButton className="btn-fill" onClick={onExport}>
              Xuất file Excel
            </CButton>
          </div>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
          <Controller
            name="startAt"
            control={control}
            render={({ field }) => (
              <CDate {...field} label="Từ ngày" required />
            )}
          />
        </CCol>
        <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
          <Controller
            name="endAt"
            control={control}
            render={({ field }) => (
              <CDate {...field} label="Đến ngày" required />
            )}
          />
        </CCol>
        <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="3">
          <Controller
            name="storeIds"
            control={control}
            render={({ field }) => (
              <CSelectMulti
                {...field}
                label="Cửa hàng"
                placeholder="Tất cả"
                options={stores}
                onChange={onStoreChange}
              />
            )}
          />
        </CCol>
        <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="3">
          <Controller
            name="responsible"
            control={control}
            render={({ field }) => (
              <CSelect
                {...field}
                label="Đơn vị chịu trách nhiệm"
                placeholder="Tất cả"
                options={[
                  { value: 1, label: "Chi nhánh" },
                  { value: 2, label: "Kho trung tâm" },
                ]}
                optionAll
                onChange={onReponsibleChange}
              />
            )}
          />
        </CCol>
        <CCol
          xs="12"
          sm="6"
          md="3"
          lg="4"
          xl="2"
          xxl="2"
          className="btn-search"
        >
          <div className="form-group c-input">
            <div>
              <CButton icon={<Magnifying />} onClick={search} className="m-0">
                Tìm kiếm
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  );
};
