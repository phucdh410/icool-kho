import { CModal } from "@coreui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MForm } from "./MForm";
import { MTable } from "./MTable";

export const MPriceSuggest = forwardRef(({ isShowTable = true }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [code, setCode] = useState(null);
  //#endregion

  //#region Event
  const onClose = () => setOpen(false);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (code) => {
      setCode(code);
      setOpen(true);
    },
  }));

  //#region Render

  return (
    <CModal
      show={open}
      onClose={onClose}
      size="xl"
      style={{ background: "white" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "20px",
        }}
      >
        <MForm code={code} />

        {isShowTable && <MTable code={code} />}
      </div>
    </CModal>
  );
  //#endregion
});
