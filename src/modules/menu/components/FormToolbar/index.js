import React from "react";

import { CRow, CCol } from "@coreui/react";

import { CActionGroup } from "_components/others";

export const FormToolbar = ({ onSave }) => {
  //#region Data
  //#endregion

  //#region Event
  const onClick = () => {
    onSave();
  }; //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup onClick={onClick} canAdd={false} canSave />
          </div>
        </CCol>
      </CRow>
    </>
  );
  //#endregion
};
