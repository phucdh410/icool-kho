import { CRow, CCol } from "@coreui/react";

import { CActionGroup } from "_components/others";
import { CButton } from "src/common/components/controls";

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
          <CButton
            className="btn-fill"
            onClick={onExport}
            style={{ marginLeft: "auto" }}
          >
            Xuất File Excel
          </CButton>
        </div>
      </CCol>
    </CRow>
  );
};
