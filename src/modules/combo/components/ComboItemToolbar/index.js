import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { CActionGroup } from "_components/others";

export const ComboItemToolbar = ({
  onAdd,
  onEdit,
  onSave,
  onRemove,
  canAdd,
  canEdit,
  canSave,
  canRemove,
}) => {
  const onClick = (key) => {
    switch (key) {
      case "add":
        return onAdd();
      case "edit":
        return onEdit();
      case "save":
        return onSave();
      case "remove":
        return onRemove();
      default:
        return onAdd();
    }
  };

  return (
    <CCard className="toolbar sticky">
      <CCardBody>
        <CRow>
          <CCol xs="12" className="action">
            <div>
              <CActionGroup
                onClick={onClick}
                canAdd={canAdd}
                canEdit={canEdit}
                canSave={canSave}
                canRemove={canRemove}
              />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};
