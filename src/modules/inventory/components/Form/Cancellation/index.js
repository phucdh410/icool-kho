import { useCallback, useEffect, useMemo, useRef,useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { ERROR_MESSAGE } from "src/configs/constant";
import { UID } from "src/utils/funcs";

import Responsble from "./Responsible";
import Table from "./Table";
import Toolbar from "./Toolbar";

export default ({ isLoading, edit, data, onSubmit }) => {
  const ref = useRef(null);
  const responsibleRef = useRef(null);

  //#region Data
  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const [status, setStatus] = useState(1);
  const [warehouse, setWarehouse] = useState(null);
  const [materials, setMaterials] = useState([]);

  const isSelectAll = useMemo(
    () => materials?.every((m) => m.check) ?? false,
    [materials]
  );

  const selected = useMemo(
    () => materials?.filter((m) => m.check) ?? [],
    [materials]
  );

  const selectedMaterials = useMemo(
    () => materials?.filter((m) => m.check) ?? [],
    [materials]
  );
  //#endregion

  //#region Events
  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onChange = (d) => setMaterials(d);

  const onAdd = (d) => setMaterials([...materials, { id: UID(), ...d }]);

  const onEdit = (d) => {
    const _index = materials.findIndex((e) => e?.id === d?.id);
    if (_index === -1) return;
    const newMaterials = [...materials];
    newMaterials[_index] = d;
    setMaterials(newMaterials);
  };

  const onApprove = () => {
    responsibleRef.current.setCodes(selected.map((m) => m.code));
  };

  const onResponsible = (reason, responsible) => {
    setMaterials(
      materials.map((m) =>
        m.check
          ? {
              ...m,
              check: false,
              reason: reason,
              approvedStatus: 1,
              responsible,
            }
          : m
      )
    );
  };

  const onSave = () => {
    clearErrors();
    handleSubmit(
      (d) => {
        if (materials.length) onSubmit({ ...d, materials });
        else {
          noti("error", ERROR_MESSAGE.NVL.REQUIRED);
          setError("materials", { type: "Required" });
        }
      },
      (e) => noti("error", e)
    )();
  };

  const onRemove = () => setMaterials(materials.filter((m) => !m.check));
  //#endregion

  useEffect(() => {
    if (isLoading || !data) return;
    Object.keys(data).forEach((key) => setValue(key, data[key]));

    setMaterials(data?.materials ?? []);
  }, [isLoading, data]);

  // #region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            edit={edit}
            setWarehouse={setWarehouse}
            control={control}
            watch={watch}
            setValue={setValue}
            status={status}
            selectedNo={selected.length}
            selectedMaterials={selectedMaterials}
            onAdd={onAdd}
            onEdit={onEdit}
            onApprove={onApprove}
            onSave={onSave}
            onRemove={onRemove}
            onStatusChange={onStatusChange}
            ref={ref}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody
          className={classNames(
            "px-0 pt-0",
            errors?.["materials"] && "border-danger"
          )}
        >
          <div className="table-responsive">
            <Table
              isSelectAll={isSelectAll}
              data={materials}
              warehouse={warehouse}
              onChange={onChange}
            />
          </div>
        </CCardBody>
      </CCard>
      {edit && (
        <Responsble
          ref={responsibleRef}
          store={watch("storeCode")}
          code={data?.code}
          onResponsible={onResponsible}
        />
      )}
    </>
  );
  //#endregion
};
