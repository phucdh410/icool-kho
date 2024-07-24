import React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse,CRow } from "@coreui/react";

import {
  ENTITY_GROUP_CODE,
  PERMISSION_VALUE,
  STATUS_OPTIONS,
} from "src/configs/constant";
import { Can } from "src/utils/ability";
import { filter as filterFunc } from "src/utils/funcs";

import { Magnifying, TickCircleFill,XCircleFill } from "_assets/icons";
import { CButton,CDate, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll } from "../../queries-fn/store.query";

export default ({
  isLoading,
  filter,
  status,
  selectedNo,
  toggleStatus,
  onAdd,
  onEdit,
  onApprove,
  onRemove,
  onSearch,
}) => {
  //#region Data

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: filter,
  });

  const { data: stores } = getAll({}, isLoading);
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

  const onStoreChange = ({ value }) => {
    setValue("storeCode", value);
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
              canAdd={false}
              canSave={false}
              canEdit={selectedNo === 1}
              canRemove={selectedNo === 1}
            />
          </div>
          <div>
            <Can
              do={PERMISSION_VALUE.APPROVE}
              on={ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM}
            >
              <Can
                do={PERMISSION_VALUE.CREATE}
                on={ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM}
              >
                <CButton className="btn-fill" to="/solution/transfer/form">
                  Tạo Phiếu luân chuyển
                </CButton>
              </Can>
              <CButton
                className="btn-fill"
                color="danger"
                disabled={selectedNo !== 1}
                onClick={onApprove(-1)}
                icon={<XCircleFill />}
              >
                Từ chối
              </CButton>
            </Can>
            <Can
              do={PERMISSION_VALUE.APPROVE}
              on={ENTITY_GROUP_CODE.PURCHASE_PROPOSAL_FORM}
            >
              <CButton
                className="btn-fill"
                color="success"
                disabled={selectedNo !== 1}
                onClick={onApprove(1)}
                icon={<TickCircleFill />}
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
        <CRow className="mt-3 justify-content-lg-end justify-content-xxl-end">
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
                  onChange={({ value }) => field.onChange(value)}
                ></CSelect>
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="startAt"
              control={control}
              render={({ field }) => <CDate label="Từ ngày: " {...field} />}
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
            <Controller
              name="storeCode"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Chi nhánh chuyển: "
                  placeholder="Tất cả"
                  options={
                    stores && stores.length > 2
                      ? [{ value: "", label: "Tất cả" }, ...stores]
                      : stores
                  }
                  {...field}
                  onChange={onStoreChange}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="storeCode"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Chi nhánh nhận: "
                  placeholder="Tất cả"
                  options={
                    stores && stores.length > 2
                      ? [{ value: "", label: "Tất cả" }, ...stores]
                      : stores
                  }
                  {...field}
                  onChange={onStoreChange}
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
            className="text-right text-sm-left text-lg-right btn-search"
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
