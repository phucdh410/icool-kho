import { CCard, CCardBody } from "@coreui/react";
import { Toolbar } from "./Toolbar";
import { FormTable } from "./FormTable";
import { FormInput } from "./FormInput";
import { useForm } from "react-hook-form";

const CreateDanhMucHangHoa = () => {
  //#region Data
  const { control } = useForm({ mode: "all" });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
          // control={control}
          // watch={watch}
          // setValue={setValue}
          // status={status}
          // selectedNo={selected.length}
          // onAdd={onAdd}
          // onSave={onSave}
          // canRemove={selected.length + selectedInput.length}
          // onRemove={onRemove}
          // onStatusChange={onStatusChange}
          // onMaterialGroupSelect={onMaterialGroupSelect}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <FormInput control={control} />
        </CCardBody>
      </CCard>
      <FormTable control={control} />
    </>
  );
  //#endregion
};

export default CreateDanhMucHangHoa;
