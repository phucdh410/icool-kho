import { useMemo, useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import classNames from "classnames";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
} from "@coreui/react";

import { khoApi } from "src/1/apis/kho.api";
import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { CFile } from "src/1/common/components/controls";
import {
  CDate,
  CInput,
  CNumberInput,
  CSelect,
} from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";

import Table from "./Table";

const DEFAULT_VALUES = {
  code: "",
  name: "",
  price: 0,
  quantity: 1,
  unit: "",
  reason: "",
  files: [],
};

export default ({ isEdit = false, onSubmit, control }) => {
  //#region Data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });

  const { data: warehouses = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-kho"],
    queryFn: () => khoApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ value: e?.code, label: e?.name })),
  });

  const {
    control: miniControl,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });

  const ware_code = useWatch({ control, name: "ware_code" });

  const { data: materialsOptions = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-nguyen-vat-lieu", ware_code],
    queryFn: () => nguyenVatLieuApi.getAll({ store_code: ware_code }),
    enabled: !!ware_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        price: e?.price,
        unit: e?.wareUnit,
      })),
  });

  const [selected, setSelected] = useState([]);

  const materialsValue = useWatch({ control, name: "materials" });

  const isSelectedAll = useMemo(
    () => selected.length === materialsValue.length && selected.length > 0,
    [selected, materialsValue]
  );
  //#endregion

  //#region Events
  const onAdd = () => {
    handleSubmit(async (values) => {
      append(values);
      reset(DEFAULT_VALUES);
    })();
  };

  const onRemove = () => {
    remove(selected);
    setSelected([]);
  };

  const onClick = (state) => {
    switch (state) {
      case "add":
        return onAdd();
      case "save":
        return onSubmit();
      case "remove":
        return onRemove();
      case "edit":
        return onEdit();
    }
  };

  const onSelectMaterial = (onChangeCallback) => (value, selectedOption) => {
    onChangeCallback(value);
    setValue("name", selectedOption?.label);
    setValue("unit", selectedOption?.unit);
    setValue("price", selectedOption?.price);
  };

  const onSelect =
    (target = -1) =>
    (checked) => {
      if (target !== -1) {
        if (checked) setSelected((prev) => [...prev, target]);
        else setSelected(selected.filter((e) => e !== target));
      } else {
        if (checked) {
          const length = materialsValue.length;
          const result = Array.from({ length }, (v, i) => i);
          setSelected(result);
        } else {
          setSelected([]);
        }
      }
    };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <CRow>
            <CCol xs="12" className="action">
              <div>
                <CActionGroup
                  onClick={onClick}
                  canAdd
                  canSave
                  canEdit={false}
                  canRemove={selected.length > 0}
                  hidePrintBtn
                />
              </div>
            </CCol>
          </CRow>
          <CCollapse show>
            <div className="mt-3 grid grid-cols-6 gap-5">
              <div className="col-span-1">
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <CInput
                      readOnly
                      label="Mã phiếu"
                      placeholder="Mã phiếu"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  name="ware_code"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      label="Tên Kho"
                      select="value"
                      required
                      options={warehouses}
                      disabled={isEdit || materialsValue.length > 0}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <CDate label="Ngày trả" required {...field} />
                  )}
                />
              </div>
              <div className="col-span-3">
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <CInput label="Ghi chú" required {...field} />
                  )}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-5">
              <div className="col-span-2">
                <Controller
                  control={miniControl}
                  name="code"
                  render={({ field: { onChange, ..._field } }) => (
                    <CSelect
                      options={materialsOptions}
                      select="value"
                      display="value"
                      label="Mã NVL"
                      required
                      onChange={onSelectMaterial(onChange)}
                      {..._field}
                    />
                  )}
                />
              </div>
              <div className="col-span-3">
                <Controller
                  control={miniControl}
                  name="code"
                  render={({ field: { onChange, ..._field } }) => (
                    <CSelect
                      options={materialsOptions}
                      select="value"
                      label="Tên NVL"
                      required
                      onChange={onSelectMaterial(onChange)}
                      {..._field}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  control={miniControl}
                  name="quantity"
                  render={({ field }) => (
                    <CNumberInput label="Số lượng" required {...field} />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  control={miniControl}
                  name="unit"
                  render={({ field }) => (
                    <CInput readOnly label="Đơn vị tính" required {...field} />
                  )}
                />
              </div>
              <div className="col-span-3">
                <Controller
                  control={miniControl}
                  name="reason"
                  render={({ field }) => (
                    <CInput label="Nguyên nhân" required {...field} />
                  )}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  control={miniControl}
                  name="files"
                  render={({ field }) => (
                    <CFile label="Hình ảnh" required {...field} />
                  )}
                />
              </div>
            </div>
          </CCollapse>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className={classNames("px-0 pt-0")}>
          <div className="table-responsive">
            <Table
              control={control}
              data={fields}
              onSelect={onSelect}
              isSelectedAll={isSelectedAll}
              selected={selected}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
