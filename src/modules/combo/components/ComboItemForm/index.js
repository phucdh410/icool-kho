import { forwardRef, useImperativeHandle } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { CCard } from "@coreui/react";

import { hangHoaApi } from "src/1/apis/hang_hoa.api";
import { CButton, CInput, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

import { defaultValues } from "../../form";

export const ComboItemForm = forwardRef((props, ref) => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const {
    fields: fieldsForm,
    append,
    remove,
  } = useFieldArray({ control, name: "goods", keyName: "__id" });

  const { data: goods_options } = useQuery({
    queryKey: ["danh-sach-hang-hoa"],
    queryFn: () => hangHoaApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        id: e?.id,
        value: e?.id,
        code: e?.code,
        label: e?.name,
        unit: e?.unit,
      })),
  });
  //#endregion

  //#region Event
  const onSubmit = (isEdit) => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
      } catch (error) {
        noti("error", "Không thể cập lưu combo item!");
      }
    })();
  };

  const onAddGood = () => {
    append({ code: "", name: "", unit: "" });
  };

  const onRemoveGood = (index) => () => {
    remove(index);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    addSubmit: () => onSubmit(),
    edit: (id) => {
      console.log("Do something with id: ", id);
    },
    saveSubmit: () => onSubmit(true),
  }));

  //#region Render
  const fields = [
    {
      key: "action",
      label: (
        <CButton
          onClick={onAddGood}
          icon={<i className="text-xl fa-regular fa-circle-plus"></i>}
        />
      ),
      sorter: false,
    },
    {
      key: "code",
      label: "Mã hàng hóa",
    },
    {
      key: "name",
      label: "Tên hàng hóa",
    },
    {
      key: "unit",
      label: "Đơn vị tính",
    },
  ];

  const render = {
    action: (record, index) => (
      <td>
        <CButton
          onClick={onRemoveGood(index)}
          icon={<i className="text-xl fa-solid fa-trash-can"></i>}
        />
      </td>
    ),
    code: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`goods.${index}.code`}
          render={({ field }) => <CSelect {...field} options={goods_options} />}
        />
      </td>
    ),
    code: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`goods.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} display="name" options={goods_options} />
          )}
        />
      </td>
    ),
    unit: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`goods.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} display="unit" options={goods_options} />
          )}
        />
      </td>
    ),
  };

  return (
    <div className="flex flex-col gap-5">
      <CCard>
        <CCardBody>
          <div className="grid grid-cols-2 gap-3">
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput {...field} label="Mã combo item" required />
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CInput {...field} label="Tên combo item" required />
              )}
            />
            <Controller
              control={control}
              name="unit"
              render={({ field }) => (
                <CInput {...field} label="Đơn vị tính" required />
              )}
            />
          </div>
        </CCardBody>
      </CCard>
      <CCard>
        <h6 className="mb-0 px-3 py-1 font-semibold">
          Danh sách mặt hàng trong combo item
        </h6>

        <CTable data={fieldsForm} fields={fields} render={render} />
      </CCard>
    </div>
  );
  //#endregion
});
