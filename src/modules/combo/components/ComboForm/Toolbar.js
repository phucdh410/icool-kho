import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { CActionGroup } from "src/common/components/others";

export const Toolbar = ({ onSubmit }) => {
  return (
    <CCard className="toolbar sticky">
      <CCardBody>
        <CRow>
          <CCol xs="12" className="action">
            <div>
              <CActionGroup onClick={onSubmit} canAdd={false} canSave />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};
