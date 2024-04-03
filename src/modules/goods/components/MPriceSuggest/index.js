import { CModal } from "@coreui/react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { MForm } from "./MForm";
import { MTable } from "./MTable";
import { getMaterialSuggestByCode } from "src/apis/material_suggest.api";
import { useQuery } from "react-query";

export const MPriceSuggest = forwardRef(
  ({ isShowTable = true, refetch }, ref) => {
    //#region Data
    const formRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState(null);

    const { data: response, refetch: tableRefetch } = useQuery({
      queryKey: ["material-suggest-detail"],
      queryFn: () => getMaterialSuggestByCode(code),
      enabled: !!code,
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
          <MForm code={code} ref={formRef} refetch={refetch || tableRefetch} />

          {isShowTable && <MTable data={suppliers} refetch={tableRefetch} />}
        </div>
      </CModal>
    );
    //#endregion
  }
);
