import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";

import { CModal } from "@coreui/react";

import { getMaterialSuggestByCode } from "src/apis/material_suggest.api";

import { MForm } from "./MForm";
import { MTable } from "./MTable";

export const MPriceSuggest = forwardRef(
  ({ isShowTable = true, refetch, code }, ref) => {
    //#region Data
    const formRef = useRef(null);

    const [open, setOpen] = useState(false);

    const { data: response, refetch: tableRefetch } = useQuery({
      queryKey: ["material-suggest-detail", code, open],
      queryFn: () => getMaterialSuggestByCode(code),
      enabled: !!code && open,
    });

    const suppliers = useMemo(() => {
      if (!!response?.data?.suppliers) {
        return response.data.suppliers;
      }
      return [];
    }, [response]);
    //#endregion

    //#region Event
    const onClose = () => {
      setOpen(false);
      formRef.current?.close();
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
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
          <MForm code={code} ref={formRef} refetch={refetch || tableRefetch} />

          {isShowTable && <MTable data={suppliers} refetch={tableRefetch} />}
        </div>
      </CModal>
    );
    //#endregion
  }
);
