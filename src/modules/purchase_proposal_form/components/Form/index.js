import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { getAutoSuggest } from "src/apis/purchase_proposal_form.api";
import { ERROR_MESSAGE } from "src/configs/constant";
import { isSuccess, UID } from "src/utils/funcs";

import { getAll as getAllMaterials } from "../../queries-fn/material.query";

import Dialog from "./Dialog";
import Good from "./Good";
import Material from "./Material";
import Toolbar from "./Toolbar";

export default ({ isLoading, edit, data, onSubmit }) => {
  const correctQuantityRef = useRef();
  //#region Data
  const {
    control,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const { data: materialDatas } = getAllMaterials(
    { storeCode: watch("storeCode"), date: watch("issueDate") },
    !watch("storeCode")
  );

  const [status, setStatus] = useState(1);

  const [isUpdated, setIsUpdated] = useState(false);

  const [current, setCurrentTab] = useState(false);

  const [materials, setMaterials] = useState([]);

  const materialSelected = useMemo(
    () => materials?.filter((m) => m.check) ?? [],
    [materials]
  );

  const [goods, setGoods] = useState([]);

  const goodSelected = useMemo(
    () => goods?.filter((g) => g.check) ?? [],
    [goods]
  );
  //#endregion

  //#region Events
  const onStatusChange = (_status) =>
    setStatus(status === _status ? 0 : _status);

  const onAutoFill = async (v) => {
    if (!v || !getValues("storeCode")) return;
    const res = await getAutoSuggest(getValues("storeCode"));

    if (isSuccess(res)) {
      setMaterials(
        res.map((r) => {
          const _material = materialDatas.find((m) => m.value === r.code);
          return { ..._material.data, ...r };
        })
      );
    }
  };

  const onAdd = () => {
    current
      ? setGoods([
          ...goods,
          { id: UID("good_"), code: "", quantity: 0, total: 0, note: "" },
        ])
      : setMaterials([
          ...materials,
          { id: UID("material_"), code: "", quantity: 0, total: 0, note: "" },
        ]);
  };

  const onSave = () => {
    clearErrors();
    handleSubmit(
      (d) => {
        const _materials = materials.filter((m) => m.code && m.boughtQ);
        const _goods = goods.filter((g) => g.code && g.quantity);

        if (_materials.length || _goods.length)
          onSubmit({ ...d, materials: _materials, goods: _goods });
        else {
          noti("error", ERROR_MESSAGE.NVL.REQUIRED);
          setError("materials", { error: "Required" });
        }
      },
      (e) => noti("error", e)
    )();
  };

  const onRemove = () => {
    current
      ? setGoods(goods.filter((g) => !g.check))
      : setMaterials(materials.filter((m) => !m.check));
  };

  const onCorrectQuantity = () => {
    correctQuantityRef.current.set(watch("storeCode"));
  };

  const onSuccess = (v) => setIsUpdated(v);
  //#endregion

  useEffect(() => {
    if (isLoading || !data) return;
    Object.keys(data).forEach((key) => setValue(key, data[key]));
    setMaterials(data.materials);
    setGoods(data.goods);
  }, [isLoading, data]);

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            isLoading={isLoading}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
            status={status}
            watch={watch}
            control={control}
            setValue={setValue}
            onStatusChange={onStatusChange}
            onAutoFill={onAutoFill}
            onAdd={onAdd}
            onSave={onSave}
            onRemove={onRemove}
            canRemove={current ? goodSelected.length : materialSelected.length}
            onCorrectQuantity={onCorrectQuantity}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader className="p-0 tabs border-0">
          <ul className="nav nav-tabs modules">
            <li className="nav-item">
              <span
                className={classNames(
                  "nav-link text-center px-4",
                  !current && "active"
                )}
                style={{ minWidth: "200px" }}
                onClick={() => setCurrentTab(false)}
              >
                Nguyên Vật Liệu
              </span>
            </li>
            <li className="nav-item">
              <span
                className={classNames(
                  "nav-link text-center px-4",
                  current && "active"
                )}
                style={{ minWidth: "200px" }}
                onClick={() => setCurrentTab(true)}
              >
                Hàng hóa
              </span>
            </li>
          </ul>
        </CCardHeader>
        <CCardBody className="px-0 pt-0">
          <div className="tab-content">
            <div
              className={classNames(
                "table-responsive tab-pane fade",
                !current && "show active"
              )}
            >
              <Material
                materials={materialDatas}
                edit={edit}
                isLoading={isLoading}
                data={materials}
                onChange={(data) => setMaterials(data)}
              />
            </div>
            <div
              className={classNames(
                "table-responsive tab-pane fade",
                current && "show active"
              )}
            >
              <Good
                edit={edit}
                isLoading={isLoading}
                storeCode={watch("storeCode")}
                data={goods}
                onChange={(data) => setGoods(data)}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>
      <Dialog ref={correctQuantityRef} onSuccess={onSuccess} />
    </>
  );
  //#endregion
};
