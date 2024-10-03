import { useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

const MForm = ({ isLoading, isEdit = false, control, onSubmit, setValue }) => {
  //#region Data
  const { fields, append, update, remove, replace } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });

  const realtimeMaterials = useWatch({ control, name: "materials" });

  const isSelectAll = useMemo(
    () =>
      realtimeMaterials.every((e) => e?.checked && realtimeMaterials.length),
    [realtimeMaterials]
  );
  //#endregion

  //#region Events
  const onAdd = () => {
    append({
      material_code: "",
      price: 0,
      total: 0,
      ware_q: 1,
      note: "",
      bought_unit: "",
      ware_unit: "",
      provider_q: 0,
      provider_unit: "",
      sum: 0,
    });
  };

  const handleCheckAll = (checked) => {
    realtimeMaterials.forEach((e, index) => {
      update(index, { ...e, checked });
    });
  };

  const onRemove = () => {
    if (isSelectAll) {
      replace([]);
    } else {
      const indexList = [];
      realtimeMaterials.forEach((e, i) => {
        if (e?.checked) indexList.push(i);
      });
      remove(indexList);
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            control={control}
            onAdd={onAdd}
            onSave={onSubmit}
            onRemove={onRemove}
            isEdit={isEdit}
            replace={replace}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 py-0">
          <div className="table-responsive">
            <Table
              fields={fields}
              control={control}
              setValue={setValue}
              isSelectAll={isSelectAll}
              handleCheckAll={handleCheckAll}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );

  //#endregion
};

export default MForm;
