import React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { ENTITY_GROUP_CODE, PERMISSION_VALUE } from "src/configs/constant";
import { Can } from "src/utils/ability";
import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

export default ({
  filter: _filter,
  status,
  selectedNo,
  toggleStatus,
  onEdit,
  onApproved,
  onRemove,
  onSearch,
  onAdd,
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

  const onClick = (state) => {
    switch (state) {
      case "add":
        return onAdd();
      case "edit":
        return onEdit();
      case "remove":
        return onRemove();
    }
  };
  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd
              canSave={false}
              canEdit={selectedNo == 1}
              canRemove={selectedNo == 1}
              canPrint={false}
            />
          </div>
          <div>
            <Can
              do={PERMISSION_VALUE.CREATE}
              on={ENTITY_GROUP_CODE.INVENTORY_SLIP}
            >
              <CButton
                to={`/goods/price-suggest/${selectedItem?.code}`}
                className="btn-fill"
                disabled={selectedNo !== 1}
              >
                Đề xuất giá
              </CButton>
            </Can>
            <Can
              do={PERMISSION_VALUE.APPROVE}
              on={ENTITY_GROUP_CODE.INVENTORY_SLIP}
            >
              <CButton
                className="btn-fill"
                disabled={!selectedNo}
                onClick={onApproved}
              >
                Xác nhận
              </CButton>
            </Can>
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
              name="approvedStatus"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Trạng thái"
                  options={[
                    { value: 0, label: "Chưa duyệt" },
                    { value: 1, label: "Đã duyệt" },
                  ]}
                  optionAll
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
