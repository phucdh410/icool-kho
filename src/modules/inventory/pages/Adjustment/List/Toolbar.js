import { Controller, useForm } from "react-hook-form";

import { CCol, CRow } from "@coreui/react";

import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";

export default ({ warehouses, filter: _filter, onSearch }) => {
  //#region Data

  const { control, handleSubmit } = useForm({
    defaultValues: _filter,
  });

  //#endregion

  //#region Event

  const search = handleSubmit(
    (d) => onSearch(filter(d)),
    (e) => noti("error", e)
  );

  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <CInput label="Mã Phiếu" placeholder="Tất cả" {...field} />
            )}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
          <Controller
            name="ware_code"
            control={control}
            render={({ field }) => (
              <CSelect
                label="Kho"
                options={warehouses}
                optionAll
                placeholder="Tất cả"
                {...field}
                onChange={(v) => field.onChange(v.value)}
              />
            )}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
          <Controller
            name="start_at"
            control={control}
            render={({ field }) => <CDate label="Ngày" {...field} />}
          />
        </CCol>
        <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
          <Controller
            name="end_at"
            control={control}
            render={({ field }) => <CDate label="Đến ngày" {...field} />}
          />
        </CCol>
        <CCol
          xs="12"
          sm="6"
          md="5"
          lg="4"
          xl="3"
          xxl="2"
          className="btn-search"
        >
          <div className="form-group c-input">
            <div>
              <CButton icon={<Magnifying />} onClick={search} className="mr-0">
                Tìm kiếm
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  );
};
