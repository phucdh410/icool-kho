import React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse,CRow } from "@coreui/react";

import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { GOODS_STATUS_OPTIONS } from "../../constants";

export default ({
  filter: _filter,
  status,
  selectedNo,
  toggleStatus,
  onAddToMenu,
  onSearch,
  selectedItem,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: _filter,
  });
  //#endregion

  //#region Event
  const toggleCollapse = () => toggleStatus(1);

  const search = handleSubmit(
    (d) => onSearch(filter(d)),
    (e) => noti("error", e)
  );
  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              canAdd={false}
              canSave={false}
              canEdit={false}
              canRemove={false}
              canPrint={false}
            />
          </div>
          <div>
            <CButton
              to={`/goods/price-update/${selectedItem?.code}`}
              className="btn-fill"
              color="warning"
              disabled={selectedNo !== 1}
            >
              Điều chỉnh giá hàng hóa
            </CButton>

            <CButton
              className="btn-fill"
              color="success"
              onClick={onAddToMenu}
              disabled={selectedNo !== 1}
            >
              Thêm vào Menu
            </CButton>

            <CButton
              className="btn-fill"
              color="danger"
              disabled={selectedNo !== 1}
              onClick={() => {}}
            >
              Ngưng
            </CButton>
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
        <CRow className="mt-3 justify-content-xxl-end">
          <CCol xs="3" md="2">
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Trạng thái"
                  options={GOODS_STATUS_OPTIONS}
                  placeholder="Tất cả"
                  {...field}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
          </CCol>
          <CCol xs="3" md="4">
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CInput label="Mã Hàng Hóa" placeholder="Tất cả" {...field} />
              )}
            />
          </CCol>
          <CCol xs="3" md="4">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CInput label="Tên Hàng Hóa" placeholder="Tất cả" {...field} />
              )}
            />
          </CCol>
          <CCol xs="3" md="2" className="btn-search">
            <div className="form-group c-input">
              <div>
                <CButton
                  icon={<Magnifying />}
                  onClick={search}
                  className="mr-0"
                >
                  Tìm kiếm
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
};
