import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCard, CCardBody, CCol, CCollapse, CRow } from "@coreui/react";

import { Magnifying, XCircleFill } from "src/common/assets/icons";
import {
  CButton,
  CDate,
  CInput,
  CSelect,
} from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";
import { COMBO_STATUSES_OPTIONS } from "src/configs/constant";
import { filter } from "src/utils/funcs";

export const ComboToolbar = ({
  params,
  canEdit,
  canRemove,
  onPause,
  onSearch,
  onEdit,
  onRemove,
  selected,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: params,
  });
  //#endregion

  //#region Event
  const onClick = (state) => {
    switch (state) {
      case "edit":
        return onEdit();
      case "remove":
        return onRemove();
      case "print":
        return;
    }
  };

  const search = handleSubmit(
    (d) => onSearch(filter(d)),
    (e) => noti("error", e)
  );
  //#endregion

  //#region Render
  return (
    <CCard className="toolbar sticky">
      <CCardBody>
        <CRow>
          <CCol xs="12" className="action">
            <div>
              <CActionGroup
                onClick={onClick}
                canAdd={false}
                canEdit={canEdit}
                canRemove={canRemove}
              />
            </div>
          </CCol>
        </CRow>

        <CCollapse show>
          <div className="mt-3 flex flex-row flex-wrap gap-2">
            <div className="min-w-[200px]">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Trạng thái"
                    options={COMBO_STATUSES_OPTIONS}
                    select="value"
                    optionAll
                  />
                )}
              />
            </div>
            <div className="min-w-[240px]">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Mã combo"
                    placeholder="Tìm kiếm theo mã"
                  />
                )}
              />
            </div>
            <div className="min-w-[240px]">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Tên combo"
                    placeholder="Tìm kiếm theo tên"
                  />
                )}
              />
            </div>
            <div className="w-[200px]">
              <Controller
                control={control}
                name="start"
                render={({ field }) => <CDate {...field} label="Từ ngày" />}
              />
            </div>
            <div className="w-[200px]">
              <Controller
                control={control}
                name="end"
                render={({ field }) => <CDate {...field} label="Đến ngày" />}
              />
            </div>
            <div className="ml-auto btn-search">
              <div className="form-group flex flex-row gap-2 c-input">
                <CButton
                  icon={<Magnifying />}
                  onClick={search}
                  className="mr-0"
                >
                  Tìm kiếm
                </CButton>
                <CButton
                  disabled={selected.length !== 1}
                  color="danger"
                  icon={<XCircleFill />}
                  onClick={onPause}
                  className="mr-0"
                >
                  Ngưng
                </CButton>
              </div>
            </div>
          </div>
        </CCollapse>
      </CCardBody>
    </CCard>
  );
  //#endregion
};
