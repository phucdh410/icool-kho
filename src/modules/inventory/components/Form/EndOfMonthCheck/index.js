import { useFieldArray } from "react-hook-form";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

const Form = ({
  isEdit = false,
  loading = false,
  onSubmit,
  control,
  setValue,
}) => {
  //#region Data
  const { fields, remove, replace, append, update } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });
  //#endregion

  //#region Events
  const onAdd = () => {
    append({
      checked: false,
      code: "",
      ware_unit: "",
      ware_q: 1,
      unit: "",
      quantity: 1,
      price: 0,
    });
  };

  const onRemove = () => {};
  //#endregion

  //#region
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            control={control}
            onAdd={onAdd}
            onSave={onSubmit}
            onRemove={onRemove}
            canRemove
            isEdit={isEdit}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <div className="table-responsive">
            <Table fields={fields} control={control} setValue={setValue} />
          </div>
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};

export default Form;
