import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCard, CCardBody, CCol, CCollapse, CRow } from "@coreui/react";

import { Magnifying, XCircleFill } from "src/common/assets/icons";
import { CButton, CDate, CSelect } from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";
import { filter } from "src/utils/funcs";

export const ComboToolbar = ({
  params,
  status,
  canEdit,
  canRemove,
  onPause,
  onSearch,
  onEdit,
  onRemove,
  selected,
  combos: _combos,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: params,
  });

  const combos = useMemo(
    () =>
      _combos
        ? _combos?.map((e) => ({ value: e?.id, label: e?.name, code: e?.code }))
        : [],
    [_combos]
  );
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
                  <CSelect {...field} label="Trạng thái" options={[]} />
                )}
              />
            </div>

            <div className="min-w-[240px]">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CSelect
                    {...field}
                    label="Mã combo"
                    display="code"
                    options={combos}
                  />
                )}
              />
            </div>
            <div className="min-w-[240px]">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CSelect {...field} label="Tên combo" options={combos} />
                )}
              />
            </div>

            <div className="w-[200px]">
              <Controller
                control={control}
                name="start"
                render={({ field }) => (
                  <CDate {...field} label="Ngày áp dụng từ" />
                )}
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
