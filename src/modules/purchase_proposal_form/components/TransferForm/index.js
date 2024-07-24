import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import classNames from "classnames";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { createTransfer, updateTransfer } from "src/apis/material.api";
import { history } from "src/App";
import { isSuccess } from "src/utils/funcs";

import Material from "./Material";
import Toolbar from "./Toolbar";

const defaultValues = {
  date: new Date(),
  note: "",
  store_from: "",
  store_to: "",
  materials: [],
};

export default ({ isLoading, edit, data }) => {
  //#region Data
  const { control, watch, setValue, reset, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
  });

  const { fields, update, append, remove, replace } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });

  const watchFieldArray = watch("materials");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  //#endregion

  //#region Events
  const onAdd = () => {
    append({
      material_id: "",
      check: false,
      code: "",
      amount: 1,
      price: 0,
      total: 0,
      note: "",
    });
  };

  const onSave = () => {
    handleSubmit(async (values) => {
      if (edit) {
        const res = await updateTransfer(values);
        if (isSuccess(res)) {
          reset(defaultValues);
          noti("success", "Sửa phiếu luân chuyển thành công!");
          history.push("/solution/transfer/list");
        } else {
          noti("error", "Sửa phiếu luân chuyển không thành công!");
        }
      } else {
        const res = await createTransfer(values);
        if (isSuccess(res)) {
          reset(defaultValues);
          noti("success", "Thêm phiếu luân chuyển thành công!");
        } else {
          noti("error", "Thêm phiếu luân chuyển không thành công!");
        }
      }
    })();
  };

  const onRemove = () => {
    const listIndex = [];
    controlledFields.forEach((e, index) => {
      if (e?.check) {
        listIndex.push(index);
      }
    });
    remove(listIndex);
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        id: data?.id,
        code: data?.code,
        date: dayjs(data?.date)?.$d,
        note: data?.note,
        store_from: data?.store_from?.code,
        store_to: data?.store_to?.code,
      });

      if (data?.materials && data.materials?.length) {
        replace(data.materials);
      }
    }
  }, [data]);

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            isLoading={isLoading}
            watch={watch}
            control={control}
            setValue={setValue}
            onAdd={onAdd}
            onSave={onSave}
            onRemove={onRemove}
            canRemove
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <div className="tab-content">
            <div
              className={classNames(
                "table-responsive tab-pane fade show active"
              )}
            >
              <Material
                control={control}
                fields={controlledFields}
                update={update}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
