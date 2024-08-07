import React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { filter as filterFunc } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { KY_DANH_GIA_OPTIONS, YEAR_OPTIONS } from "../../constants";

export const ListToolbar = ({
  params,
  status,
  toggleStatus,
  canAdd,
  canEdit,
  canRemove,
  onAdd,
  onEdit,
  onRemove,
  onSearch,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: params,
  });
  //#endregion

  //#region Event
  const onClick = (state) => {
    switch (state) {
      case "add":
        return onAdd();
      case "edit":
        return onEdit();
      case "remove":
        return onRemove();
      case "print":
        return;
    }
  };

  const search = handleSubmit(
    (d) => onSearch(filterFunc(d)),
    (e) => noti("error", e)
  );

  const toggleCollapse = () => toggleStatus(1);
  //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={canAdd}
              canEdit={canEdit}
              canRemove={canRemove}
            />
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
        <CRow className="mt-3">
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="cycle"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Kỳ đánh giá:"
                  options={[
                    { value: "", label: "Tất cả" },
                    ...KY_DANH_GIA_OPTIONS,
                  ]}
                  placeholder="Tất cả"
                  {...field}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Năm:"
                  options={YEAR_OPTIONS}
                  placeholder="Tất cả"
                  {...field}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="start_at"
              control={control}
              render={({ field }) => <CDate label="Từ ngày: " {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="end_at"
              control={control}
              render={({ field }) => <CDate label="Đến ngày: " {...field} />}
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
              <CButton icon={<Magnifying />} onClick={search} className="m-0">
                Tìm kiếm
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
