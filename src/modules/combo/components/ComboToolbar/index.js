import { Controller, useForm } from "react-hook-form";

import { CCard, CCardBody, CCol, CCollapse, CRow } from "@coreui/react";

import { Magnifying, XCircleFill } from "src/common/assets/icons";
import { CButton, CDate, CSelect } from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";
import { filter } from "src/utils/funcs";

export const ComboToolbar = ({
  params,
  status,
  toggleStatus,
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
                canAdd={false}
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

        <CCollapse>
          <CRow className="mt-3 justify-content-xxl-end">
            <CCol xs="2">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect {...field} label="Trạng thái" options={[]} />
                )}
              />
            </CCol>
            <CCol xs="1">
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
                  <CSelect {...field} label="Tên hàng hóa" options={[]} />
                )}
              />
            </CCol>
            <CCol xs="2">
              <Controller
                control={control}
                name="start"
                render={({ field }) => (
                  <CDate {...field} label="Ngày áp dụng từ" />
                )}
              />
            </CCol>
            <CCol xs="2">
              <Controller
                control={control}
                name="end"
                render={({ field }) => <CDate {...field} label="Đến ngày" />}
              />
            </CCol>
            <CCol xs="2" className="btn-search">
              <div className="form-group c-input">
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
            </CCol>
          </CRow>
        </CCollapse>
      </CCardBody>
    </CCard>
  );
  //#endregion
};
