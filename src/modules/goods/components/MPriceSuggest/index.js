import { CModal } from "@coreui/react";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { MForm } from "./MForm";
import { MTable } from "./MTable";
import { getMaterialSuggestByCode } from "src/apis/material_suggest.api";
import { useQuery } from "react-query";

export const MPriceSuggest = forwardRef(({ isShowTable = true }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [code, setCode] = useState(null);

  const { data: response } = useQuery({
    queryKey: ["material-suggest-detail"],
    queryFn: () => getMaterialSuggestByCode(code),
    enabled: !!code,
  });

  const suppliers = useMemo(() => {
    console.log(response);
    if (!!response?.data?.suppliers) {
      return response.data.suppliers;
    }
    return [];
  }, [response]);
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
      className="wide-modal"
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

        {isShowTable && <MTable code={code} data={suppliers} />}
      </div>
    </CModal>
  );
  //#endregion
});
