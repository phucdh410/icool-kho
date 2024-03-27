import { CModal } from "@coreui/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { MForm } from "./MForm";
import { MTable } from "./MTable";

export const MPriceSuggest = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(true);

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
      <div style={{ padding: "20px" }}>
        <MForm code={code} />

        <MTable code={code} />
      </div>
    </CModal>
  );
  //#endregion
});
