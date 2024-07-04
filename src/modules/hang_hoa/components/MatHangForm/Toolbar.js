import { CCol, CRow } from "@coreui/react";
import { CActionGroup } from "src/common/components/others";

export const Toolbar = ({ loading, canAdd, canSave, onSumbit }) => {
  const onClick = (selection) => {
    switch (selection) {
      case "add":
      case "save":
        onSumbit();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              canAdd={!loading && canAdd}
              canSave={canSave}
              canEdit={false}
              canRemove={false}
              canPrint={false}
              onClick={onClick}
            />
          </div>
        </CCol>
      </CRow>
    </>
  );
};
