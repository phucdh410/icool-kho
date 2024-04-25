import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { useFieldArray, useForm } from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import Toolbar from "./Toolbar";
import Material from "./Material";
import Dialog from "./Dialog";

import { isSuccess, UID } from "src/utils/funcs";
import { ERROR_MESSAGE } from "src/configs/constant";

import { getAutoSuggest } from "src/apis/purchase_proposal_form.api";
import { getAll as getAllMaterials } from "../../queries-fn/material.query";

const MOCK_NVL = [
  { id: "1", value: "1", label: "Đậu phộng" },
  { id: "2", value: "2", label: "Bánh phòng tôm" },
  { id: "3", value: "3", label: "Cá viên chiên" },
  { id: "4", value: "4", label: "Tôm rang muối ớt" },
  { id: "5", value: "5", label: "Chả giò" },
];

const defaultValues = {
  date: new Date(),
  note: "",
  store_from: "",
  store_to: "",
  materials: [],
};

export default ({ isLoading, edit, data, onSubmit }) => {
  //#region Data
  const { control, watch, getValues, setValue, clearErrors, handleSubmit } =
    useForm({
      mode: "all",
      defaultValues,
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });
  //#endregion

  //#region Events
  const onAdd = () => {
    append({
      material_id: "",
      code: "",
      amount: 1,
      price: 0,
      note: "",
    });
  };

  const onSave = () => {
    clearErrors();
    handleSubmit(
      (values) => {
        console.log(values);
      },
      (e) => noti("error", e)
    )();
  };

  const onRemove = () => {};
  //#endregion

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
          />
          <button
            onClick={() => {
              console.log(getValues());
            }}
          >
            CLick
          </button>
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
              <Material edit={edit} isLoading={isLoading} data={fields} />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
