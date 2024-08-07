import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { STATUS_OPTIONS } from "src/configs/constant";
import { PRINT_OPTIONS } from "src/configs/constant";
import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";

import { getAll } from "../../queries-fn/store.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

export default ({
  filter,
  status,
  selectedNo,
  paperSize,
  toggleStatus,
  setPaperSize,
  onSearch,
  onPrint,
  onPrintMaterialByGroup,
}) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: filter,
  });

  const { data: stores } = getAll({}, isLoading);
  //#endregion

  //#region Event
  const onStoreChange = ({ value }) => {
    setValue("store_code", value);
  };

  const search = handleSubmit(
    (d) => onSearch(filterFn(d)),
    (e) => noti("error", e)
  );

  const changePaperSize = useCallback(({ value }) => setPaperSize(value), []);

  const print = (isSingle) => () => onPrint(isSingle, paperSize);

  const toggleCollapse = () => toggleStatus(1);
  //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div className="d-flex" style={{ gap: "10px" }}>
            <div className="d-flex" style={{ gap: "10px" }}>
              <label className="m-0 align-self-center">
                Kích thước trang in:
              </label>
              <CSelect
                value={paperSize}
                options={PRINT_OPTIONS}
                onChange={changePaperSize}
              />
            </div>
            <div>
              <CButton
                className="btn-fill"
                color="primary"
                disabled={selectedNo !== 1}
                onClick={print(true)}
              >
                In đơn lẻ
              </CButton>
              <CButton
                className="btn-fill"
                color="primary"
                disabled={selectedNo !== 1}
                onClick={onPrintMaterialByGroup}
              >
                In theo nhóm hàng
              </CButton>
              <CButton
                className="btn-fill"
                color="primary"
                disabled={selectedNo < 2}
                onClick={print(false)}
              >
                In đơn gộp
              </CButton>
            </div>
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse",
              status == 1 && "show"
            )}
            onClick={toggleCollapse}
          ></div>
        </CCol>
      </CRow>

      <CCollapse show={status === 1}>
        <CRow className="mt-3 justify-content-lg-end justify-content-xxl-end">
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <CInput {...field} label="Số đơn hàng: " placeholder="Tất cả" />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="store_code"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Đến chi nhánh: "
                  placeholder="Tất cả"
                  options={stores}
                  {...field}
                  onChange={onStoreChange}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Trạng thái: "
                  placeholder="Tất cả"
                  options={STATUS_OPTIONS}
                  {...field}
                ></CSelect>
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="startAt"
              control={control}
              render={({ field }) => <CDate label="Tạo từ ngày: " {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="endAt"
              control={control}
              render={({ field }) => <CDate label="Đến ngày: " {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <CDate label="Ngày giao: " placeholderText="Chọn ngày" />
          </CCol>
          <CCol
            xs="12"
            sm="6"
            md="3"
            lg="4"
            xl="2"
            xxl="2"
            className="text-right text-sm-left text-lg-right btn-search"
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
      </CCollapse>
    </>
  );
  //#endregion
};
