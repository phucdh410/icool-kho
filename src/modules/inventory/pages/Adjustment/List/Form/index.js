import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { CIconButton } from "src/1/common/components/controls";
import { CTable } from "src/1/common/components/others";

import { EditPencil, PlusCircle, Save, Trash, TrashFill } from "_assets/icons";
import { CButton, CNumberInput, CSelect } from "_components/controls";

const DEFAULT_MATERIALS_VALUES = { materials: [] };

const DEFAULT_INPUT_VALUES = {
  index: -1,
  code: "",
  name: "",
  ware_q: 1,
  ware_unit: "",
};

export default forwardRef(({ store_code, status }, ref) => {
  //#region Data
  const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES);

  const { control, reset } = useForm({
    defaultValues: DEFAULT_MATERIALS_VALUES,
  });

  const { fields, append, remove, update, replace } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });

  const materialsValue = useWatch({ control, name: "materials" });

  const { data: materials = [] } = useQuery({
    queryKey: ["danh-sach-nguyen-vat-lieu", store_code],
    queryFn: () => nguyenVatLieuApi.getAll({ store_code }),
    enabled: !!store_code && status === 3,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        code: e?.code,
        label: e?.name,
        ware_unit: e?.wareUnit,
      })),
  });
  //#endregion

  //#region Event
  const onInputChange = (key) => (value, selectedOption) => {
    if (key === "code") {
      setInputValues((prev) => ({
        ...prev,
        code: value,
        name: selectedOption?.label,
        ware_unit: selectedOption?.ware_unit,
      }));
    } else {
      setInputValues((prev) => ({ ...prev, [key]: value }));
    }
  };

  const onSubmit = () => {
    const { index, ...values } = inputValues;
    if (index !== -1) {
      update(index, values);
    } else {
      append(values);
    }
    setInputValues(DEFAULT_INPUT_VALUES);
  };

  const onEdit = (index, editedData) => () => {
    setInputValues({ index, ...editedData });
  };

  const onRemove = (index) => () => {
    remove(index);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    submit: () => {
      const values = materialsValue?.map((e) => ({
        code: e?.code,
        ware_q: e?.ware_q,
        ware_unit: e?.ware_unit,
      }));
      reset(DEFAULT_MATERIALS_VALUES);
      return values;
    },
    getInitMaterials: (initMaterials) => {
      replace(initMaterials);
    },
  }));

  //#region Render
  const headers = [
    { key: "code", label: "Mã" },
    { key: "name", label: "Tên" },
    { key: "ware_q", label: "Số lượng" },
    { key: "ware_unit", label: "Đơn vị lưu kho" },
    {
      key: "action",
      label: "",
      cellRender: (value, record, index) => (
        <div className="flex gap-2 flex-row items-center">
          <CIconButton icon={<EditPencil />} onClick={onEdit(index, record)} />
          <CIconButton
            color="error"
            icon={<TrashFill />}
            onClick={onRemove(index)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <CCard>
        <CCardBody>
          <div className="btn-group">
            {inputValues.index !== -1 ? (
              <CButton
                disabled={!store_code || status !== 3}
                icon={<Save />}
                color={"primary"}
                onClick={onSubmit}
              >
                Lưu
              </CButton>
            ) : (
              <CButton
                disabled={!store_code || status !== 3}
                icon={<PlusCircle />}
                color={"primary"}
                onClick={onSubmit}
              >
                Thêm
              </CButton>
            )}
          </div>
          <CRow className="mt-3">
            <CCol>
              <CSelect
                required
                disabled={inputValues.index !== -1}
                options={materials}
                value={inputValues.code}
                select="code"
                display="code"
                label="Mã NVL"
                onChange={onInputChange("code")}
              />
            </CCol>
            <CCol>
              <CSelect
                required
                disabled={inputValues.index !== -1}
                options={materials}
                value={inputValues.code}
                select="code"
                label="Tên NVL"
                onChange={onInputChange("code")}
              />
            </CCol>
            <CCol>
              <CNumberInput
                label="Số lượng"
                required
                value={inputValues.ware_q}
                onChange={onInputChange("ware_q")}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0">
          <CTable headers={headers} data={fields} rowKey="__id" />
        </CCardBody>
      </CCard>
    </>
    //#endregion
  );
});
