import { useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse,CRow } from "@coreui/react";

import { checkSave, checkUpdated } from "src/apis/purchase_proposal_form.api";
import { isSuccess } from "src/utils/funcs";
import { format } from "src/utils/moment";

import { CButton, CDate,CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import CCheckbox from "../../components/Checkbox";
import { getAll } from "../../queries-fn/store.query";

export default ({
  edit,
  isLoading,
  isUpdated,
  setIsUpdated,
  status,
  watch,
  control,
  setValue,
  onStatusChange,
  onAutoFill,
  canRemove,
  onAdd,
  onSave,
  onRemove,
  onCorrectQuantity,
  hideEditBtn,
}) => {
  //#region Data
  const [autoSuggest, setAutoSuggest] = useState(false);

  const [isSave, setSave] = useState(true);

  const { data: stores } = getAll({}, isLoading);
  //#endregion

  //#region Event
  const toggleCollapse = useCallback(() => onStatusChange(1), [onStatusChange]);

  const toggleAutoSuggest = useCallback(
    (v) => {
      onAutoFill(v);
      setAutoSuggest(v);
    },
    [onAutoFill]
  );

  const correct = useCallback(() => onCorrectQuantity(), [onCorrectQuantity]);

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

  const onStoreSelect = useCallback(
    ({ data, value, label }) => {
      setValue("storeAddress", data.address);
      setValue("storePhone", data.phone);
      setValue("storeCode", value);
    },
    [setValue]
  );
  //#endregion

  useEffect(() => {
    const onStoreChange = async () => {
      setIsUpdated(false);
      setSave(true);
      if (stores && watch("storeCode")) {
        const store = stores.find((s) => s.value == watch("storeCode"));

        setValue("storeName", store.data.name);
        setValue("storeAddress", store.data.address);
        setValue("storePhone", store.data.phone);

        const res = await checkUpdated(watch("storeCode"));

        const _res = await checkSave(watch("storeCode"));

        if (isSuccess(res)) {
          setIsUpdated(res.data);
          onAutoFill(autoSuggest);
        }

        if (isSuccess(_res)) {
          setSave(_res.data);
        }
      }
    };
    watch("storeCode") && onStoreChange();
  }, [stores, watch("storeCode")]);

  useEffect(() => {
    const onIssueDateChange = async () => {
      const res = await checkUpdated(watch("storeCode"), {
        date: format(watch("issueDate"), "YYYY-MM-DD"),
      });

      const _res = await checkSave(watch("storeCode"), {
        date: format(watch("issueDate"), "YYYY-MM-DD"),
      });

      if (isSuccess(res)) {
        setIsUpdated(res.data);
        onAutoFill(autoSuggest);
      }

      if (isSuccess(_res)) {
        setSave(_res.data);
      }
    };

    watch("issueDate") && onIssueDateChange();
  }, [watch("issueDate")]);

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={true}
              canSave={isSave}
              canEdit={false}
              canRemove={canRemove}
              hideEditBtn={hideEditBtn}
            />
          </div>
          {!edit && (
            <div>
              <CButton onClick={correct}>Cập nhật định lượng</CButton>
            </div>
          )}
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
          <CCol xs="12" sm="12" md="4" lg="3" xl="3" xxl="2">
            <CInput value={watch("code")} disabled label="Số đơn hàng" />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="3" xxl="3">
            <Controller
              name="storeCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CSelect
                  label="Chi nhánh"
                  options={stores}
                  {...field}
                  onChange={onStoreSelect}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="2" xxl="2">
            <Controller
              name="issueDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <CDate label="Ngày giao" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="12" md="12" lg="12" xl="4" xxl="5">
            <Controller
              name="reason"
              control={control}
              render={({ field }) => <CInput label="Ghi chú" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="12" md="6" lg="6" xl="6" xxl="5">
            <CInput
              value={watch("storeAddress") || ""}
              readOnly
              label="Địa chỉ"
            />
          </CCol>
          <CCol xs="12" sm="12" md="6" lg="3" xl="2" xxl="2">
            <CInput
              value={watch("storePhone") || ""}
              readOnly
              label="Số điện thoại"
            />
          </CCol>
          <CCol
            xs="12"
            sm="12"
            md="12"
            lg="6"
            xl="4"
            xxl="5"
            className="btn-search"
          >
            <CCheckbox
              value={autoSuggest}
              disabled={!isUpdated}
              onChange={toggleAutoSuggest}
              label="Hệ thống tự động đề xuất Nguyên Vật Liệu"
            />
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
