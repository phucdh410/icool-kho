import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { cancelApi } from "src/apis/cancellation_slip.api";
import { uploadApi } from "src/apis/upload.api";
import { EditPencil } from "src/common/assets/icons";

import {
  CButton,
  CDate,
  CFile,
  CInput,
  CNumber,
  CSelect,
} from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllMaterials } from "../../../queries-fn/material.query";
import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";

export default forwardRef(
  (
    {
      edit,
      isLoading,
      setWarehouse,
      status,
      setValue,
      watch,
      control,
      selectedMaterials,
      onStatusChange,
      selectedNo,
      onAdd,
      onEdit: editRow,
      onApprove,
      onSave,
      onRemove,
    },
    ref
  ) => {
    //#region Data
    const [canEditNVL, setCanEditNVL] = useState(false);

    const { data: warehouses } = getAllWarehouse({}, isLoading);
    const { data: materials } = getAllMaterials(
      { store_code: watch("store_code") },
      isLoading || !watch("store_code")
    );

    const {
      control: formControl,
      setValue: setFormValue,
      reset,
      handleSubmit,
    } = useForm();

    const fileRef = useRef(null);
    //#endregion

    //#region Event
    const toggleCollapse = useCallback(
      () => onStatusChange(1),
      [onStatusChange]
    );

    const onEdit = () => {
      setCanEditNVL(true);

      const selectedMaterial = selectedMaterials?.[0];

      setFormValue("id", selectedMaterial?.id);
      setFormValue("name", selectedMaterial?.name);
      setFormValue("code", selectedMaterial?.code);
      setFormValue("wareQ", selectedMaterial?.wareQ);
      setFormValue("wareUnit", selectedMaterial?.wareUnit);
      setFormValue("price", selectedMaterial?.price);
      setFormValue("reason", selectedMaterial?.reason);
      setFormValue("files", selectedMaterial?.files);
    };

    const resetRow = () => {
      reset({
        id: "",
        name: "",
        code: "",
        price: 0,
        wareQ: 0,
        wareUnit: "",
        reason: "",
        files: [],
      });
      setCanEditNVL(false);
      fileRef.current?.clearList();
    };

    const submit = handleSubmit(
      async (d) => {
        try {
          const store_code = Number(watch("store_code")) ?? 0;

          const payload = {
            ...d,
            store_code,
            vat: 0,
            files: d?.files?.map((e) => e?.id),
          };
          const res = await cancelApi.create_material(payload);
          resetRow();
          onAdd({ ...res?.data });
        } catch (error) {
          noti("error", error?.message || "Lỗi");
        }
      },
      (e) => {}
    );

    const onClick = useCallback(
      (state) => {
        switch (state) {
          case "add":
            return submit();
          case "save":
            return onSave();
          case "remove":
            return onRemove();
          case "edit":
            return onEdit();
        }
      },
      [submit, onEdit, onSave, onRemove]
    );

    const onMaterialsChange = useCallback(({ data }) => {
      setFormValue("code", data.code);
      setFormValue("name", data.name);
      setFormValue("wareUnit", data.wareUnit);
      setFormValue("price", data.warePrice);
    });

    const onWareChange = useCallback(
      ({ data, label }) => {
        setValue("store_code", data.store_code);
        setValue("ware_code", data.code);
        setWarehouse(label);
      },
      [control, setValue]
    );

    const onFileUpload = (currentValue, changeCb) => async (qq) => {
      try {
        const file = qq?.[0];
        const res = await uploadApi.create(file);
        if (currentValue && Array.isArray(currentValue)) {
          changeCb([...currentValue, res?.data]);
        } else changeCb([res?.data]);
      } catch (error) {
        console.log("🚀 ~ onFileUpload ~ error:", error);
        noti("error", error?.message || "Lỗi");
      }
    };

    const saveEdit = () => {
      handleSubmit(async (value) => {
        try {
          const payload = {
            ...value,
            vat: 0,
            files: value?.files?.map((e) => e?.id),
          };
          await cancelApi.update_material(payload);
          resetRow();
          editRow(value);
        } catch (error) {
          console.log(error);
          noti("error", error?.message || "Lỗi");
        }
      })();
    };
    //#endregion

    useImperativeHandle(ref, () => ({ setValue: setFormValue }));

    useEffect(() => {
      if (warehouses) {
        const _find = warehouses.find((w) => w.value === watch("ware_code"));
        _find && setWarehouse(_find.label);
      }
    }, [warehouses, watch("ware_code")]);

    //#region Render
    return (
      <>
        <CRow>
          <CCol xs="12" className="action">
            <div>
              <CActionGroup
                onClick={onClick}
                canAdd={true}
                canSave={true}
                canEdit={selectedNo === 1 && !canEditNVL}
                canRemove={!!selectedNo && status !== 3}
                hidePrintBtn
                status={status}
                otherFeatures={
                  <>
                    <CButton
                      icon={<EditPencil />}
                      disabled={!canEditNVL}
                      color="primary"
                      onClick={saveEdit}
                    >
                      Cập nhật NVL
                    </CButton>
                  </>
                }
              />
            </div>
            {edit && (
              <div>
                <CButton
                  className="btn-fill"
                  disabled={!selectedNo}
                  onClick={onApprove}
                >
                  Xác nhận
                </CButton>
              </div>
            )}
            <div
              className={classNames(
                "btn",
                "btn-primary",
                "btn-collapse",
                "extend",
                status == 1 && "show"
              )}
              onClick={toggleCollapse}
            ></div>
          </CCol>
        </CRow>
        <CCollapse show={status === 1}>
          <CRow className="mt-3">
            <CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="2">
              <CInput readOnly label="Mã phiếu" value={watch("code")} />
            </CCol>
            <CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
              <Controller
                name="ware_code"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CSelect
                    label="Tên Kho"
                    required
                    options={warehouses ?? []}
                    readOnly={edit}
                    {...field}
                    onChange={onWareChange}
                  />
                )}
              />
            </CCol>
            <CCol xs="12" sm="12" md="4" lg="4" xl="6" xxl="4">
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <CInput label="Ghi chú" required {...field} />
                )}
              />
            </CCol>
            <CCol xs="12" sm="12" md="4" lg="3" xl="2" xxl="3">
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <CDate label="Ngày hủy" {...field} />}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="2">
              <Controller
                name="code"
                control={formControl}
                rules={{ required: true }}
                render={({ field: { value } }) => (
                  <CInput readOnly label="Mã NVL" value={value} />
                )}
              />
            </CCol>
            <CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="3">
              <Controller
                name="code"
                control={formControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <CSelect
                    label="Nguyên Vật Liệu"
                    required
                    options={materials}
                    {...field}
                    ignore={selectedMaterials}
                    onChange={onMaterialsChange}
                  />
                )}
              />
            </CCol>
            <CCol xs="12" sm="6" md="4" lg="2" xl="2" xxl="2">
              <Controller
                name="wareQ"
                control={formControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <CNumber label="Số lượng" required min={0} {...field} />
                )}
              />
            </CCol>
            <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="3">
              <Controller
                name="reason"
                control={formControl}
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput label="Nguyên nhân" required {...field} />
                )}
              />
            </CCol>
            <CCol xs="12" sm="6" md="4" lg="4" xl="3" xxl="2">
              <Controller
                name="files"
                control={formControl}
                rules={{ required: true }}
                render={({ field: { _field, value, onChange } }) => (
                  <CFile
                    label="Hình ảnh"
                    required
                    multiple={false}
                    max="2"
                    {..._field}
                    ref={fileRef}
                    value={value}
                    onChange={onFileUpload(value, onChange)}
                  />
                )}
              />
            </CCol>
          </CRow>
        </CCollapse>
      </>
    );
    //#endregion
  }
);
