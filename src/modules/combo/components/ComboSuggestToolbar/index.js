import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCard, CCardBody, CCol, CCollapse, CRow } from "@coreui/react";

import { Magnifying } from "src/common/assets/icons";
import { CButton, CSelect } from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";
import { filter } from "src/utils/funcs";

export const ComboSuggestToolbar = ({
  params,
  status,
  toggleStatus,
  canEdit,
  canRemove,
  onApprove,
  onSearch,
  onAdd,
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

  const toggleCollapse = () => toggleStatus(1);

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
                canEdit={canEdit}
                canRemove={canRemove}
              />
            </div>
            <CButton
              disabled={selected.length !== 1}
              onClick={onApprove}
              className="mr-2"
            >
              Xác nhận
            </CButton>
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
            <CCol xs="2">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect {...field} label="Trạng thái" options={[]} />
                )}
              />
            </CCol>
            <CCol xs="2">
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <CSelect {...field} label="Mã combo" options={[]} />
                )}
              />
            </CCol>
            <CCol xs="3">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CSelect {...field} label="Tên combo" options={[]} />
                )}
              />
            </CCol>
            <CCol xs="5" className="btn-search flex items-end justify-end">
              <div className="form-group c-input w-fit">
                <CButton
                  icon={<Magnifying />}
                  onClick={search}
                  className="mr-0"
                >
                  Tìm kiếm
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCollapse>
      </CCardBody>
    </CCard>
  );
  //#endregion
};
