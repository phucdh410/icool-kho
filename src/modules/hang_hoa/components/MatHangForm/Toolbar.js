import { CCol, CRow } from "@coreui/react";
import { CActionGroup } from "src/common/components/others";

export const Toolbar = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              canAdd={false}
              canSave={false}
              canEdit={false}
              canRemove={false}
              canPrint={false}
            />
          </div>
        </CCol>
      </CRow>
    </>
  );
};
