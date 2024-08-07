import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { ERROR_MESSAGE } from "src/configs/constant";
import { UID } from "src/utils/funcs";

import Table from "./Table";
import Toolbar from "./Toolbar";

const MForm = ({ isLoading, edit, data, onSubmit }) => {
  //#region Data
  const { control, watch, clearErrors, setValue, setError, handleSubmit } =
    useForm({
      defaultValues: data,
    });

  const [status, setStatus] = useState(1);

  const [materials, setMaterials] = useState([]);

  const isSelectAll = useMemo(
    () => materials?.every((m) => m.check) ?? false,
    [materials]
  );

  const selected = useMemo(
    () => materials?.filter((m) => m.check) ?? [],
    [materials]
  );
  //#endregion

  //#region Events
  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onAdd = () => {
    setMaterials([...materials, { id: UID() }]);
  };

  const onRemove = () => {};

  const onSave = () => {
    clearErrors();
    handleSubmit(
      (d) => {
        const _materials = materials.filter((m) => m.boughtQ);

        if (_materials.length) {
          onSubmit({ ...d, materials: _materials });
        } else {
          noti("error", ERROR_MESSAGE.PURCHASE_SLIP.REQUIRED);
          setError("materials", { type: "Required" });
        }
      },
      (e) => noti("error", e)
    )();
  };
  //#enderion

  useEffect(() => {
    if (isLoading || !data) return;
    Object.keys(data).forEach((key) => setValue(key, data[key]));
    setMaterials(data.materials ?? []);
  }, [isLoading, data]);

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            control={control}
            watch={watch}
            setValue={setValue}
            status={status}
            selectedNo={selected.length}
            onAdd={onAdd}
            onSave={onSave}
            onRemove={onRemove}
            onStatusChange={onStatusChange}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 py-0">
          <div className="table-responsive">
            <Table
              edit={edit}
              isLoading={isLoading}
              isSelectAll={isSelectAll}
              data={materials}
              store_code={watch("store_code")}
              onChange={(data) => setMaterials(data)}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );

  //#endregion
};

export default MForm;
