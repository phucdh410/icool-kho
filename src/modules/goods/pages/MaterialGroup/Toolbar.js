import { useEffect } from "react";

import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { CRow, CCol, CCollapse } from "@coreui/react";

import { CInput, CButton } from "_components/controls";
import { CActionGroup } from "_components/others";

import { filter } from "src/utils/funcs";
import { Magnifying } from "_assets/icons";
import { ERROR_MESSAGE } from "src/configs/constant";

export default ({
  status,
  selectedNo,
  toggleStatus,
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
