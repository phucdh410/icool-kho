import { CCol,CRow } from "@coreui/react";

import { CButton } from "src/common/components/controls";

import { CActionGroup } from "_components/others";

export default ({
  status,
  selectedNo,
  onAdd,
  onEdit,
  onSave,
  onRemove,
  onPrint,
  canSave,
  onExport,
  CustomFeatures,
}) => {
  //#region Event
  const onClick = (state) => {
    switch (state) {
      case "add":
        return onAdd();
      case "edit":
        return onEdit();
      case "save":
        return onSave();
      case "remove":
        return onRemove();
      case "print":
        return onPrint();
    }
  };
  //#endregion

  return (
    <CRow>
      <CCol xs="12">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CActionGroup
            status={status}
            onClick={onClick}
            canAdd={status !== 3}
            canSave={canSave}
            canEdit={selectedNo === 1 && status !== 2}
            canRemove={selectedNo === 1 && status !== 2}
            // canRemove={!!selectedNo && !status}
          />
          <div style={{ marginLeft: "auto" }}>
            {CustomFeatures}
            <CButton className="btn-fill" onClick={onExport}>
              Xuất File Excel
            </CButton>
          </div>
        </div>
      </CCol>
    </CRow>
  );
};
