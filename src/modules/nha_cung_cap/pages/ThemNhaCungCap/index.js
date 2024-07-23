import { CCard, CCardBody } from "@coreui/react";
import { FormTable, FormToolbar } from "../../components";
import { useForm } from "react-hook-form";
import { defaultValues, resolver } from "../../form";

const ThemNhaCungCap = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: "all", defaultValues, resolver });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <FormToolbar control={control} />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default ThemNhaCungCap;
