import { useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllStore } from "../../queries-fn/store.query";

export default ({
  isLoading,
  status,
  watch,
  control,
  setValue,
  onStatusChange,
  selectedNo,
  onAdd,
  onSave,
  onRemove,
}) => {
  //#region Data
  const { data: stores } = getAllStore({}, isLoading);
  //#endregion

  //#region Event
  const toggleCollapse = useCallback(() => onStatusChange(1), [onStatusChange]);

  const onClick = useCallback(
    (state) => {
      switch (state) {
        case "add":
          return onAdd();
        case "save":
          return onSave();
        case "remove":
          return onRemove();
      }
    },
    [onAdd, onSave, onRemove]
  );

  const changeStore = useCallback(({ value, data }) => {
    setValue("store_code", value);
    setValue("storeAddress", data.address);
    setValue("storePhone", data.phone);
  }, []);
  //#endregion

  useEffect(() => {
    if (stores && watch("store_code")) {
      const store = stores.find((s) => s.value == watch("store_code"));
      if (store) {
        setValue("storeAddress", store?.data?.address);
        setValue("storePhone", store?.data?.phone);
      }
    }
  }, [stores, watch("store_code")]);

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={true}
              canSave={true}
              canEdit={false}
              canRemove={selectedNo}
            />
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse",
              "extend",
              status == 1 && "show"
            )}
            onClick={toggleCollapse}
          ></div>
        </CCol>
      </CRow>
      <CCollapse show={status === 1}>
        <CRow className="mt-3">
          <CCol xs="12" sm="6" md="4" lg="3" xl="2" xxl="2">
            <CInput
              label="Số đơn hàng"
              readOnly
              required
              control={control}
              value={watch("code")}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="3" xl="3" xxl="2">
            <Controller
              name="store_code"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Đến chi nhánh"
                  required
                  options={stores}
                  ignore={["8", "21"]}
                  {...field}
                  onChange={changeStore}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="2" xxl="2">
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CDate label="Ngày giao" required {...field} />
              )}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="2" xxl="2">
            <CInput
              label="Số điện thoại"
              required
              control={control}
              readOnly
              value={watch("storePhone")}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="4" xxl="4">
            <CInput
              label="Địa chỉ"
              required
              readOnly
              control={control}
              value={watch("storeAddress")}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="12" xxl="12">
            <Controller
              name="note"
              control={control}
              defaultValue=""
              render={({ field }) => <CInput label="Ghi chú" {...field} />}
            />
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
