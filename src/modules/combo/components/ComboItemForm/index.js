import { forwardRef, useImperativeHandle } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { CCard, CCardBody } from "@coreui/react";

import { comboItemApi } from "src/1/apis/combo_item.api";
import { hangHoaApi } from "src/1/apis/hang_hoa.api";
import { CIconButton } from "src/1/common/components/controls";
import { CButton, CInput, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

import { defaultValues } from "../../form";

export const ComboItemForm = forwardRef(({ refetch, listReset }, ref) => {
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
        code: e?.code,
        label: e?.name,
        unit: e?.unit,
        value: e?.code,
      })),
  });
  //#endregion

  //#region Event
  const onSubmit = (isEdit) => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          goods: values?.goods?.map((e) => e?.code),
        };

        if (isEdit) {
          const id = values?.id;
          await comboItemApi.update(id, payload);
        } else {
          await comboItemApi.create(payload);
        }

        refetch();
        reset(defaultValues);
        noti(
          "success",
          isEdit ? "Sửa combo item thành công!" : "Thêm combo item thành công!"
        );
      } catch (error) {
        noti("error", "Không thể lưu combo item!");
      }
    })();
  };

  const onAddGood = () => {
    append({ code: "", name: "", unit: "" });
  };

  const onRemoveGood = (index) => () => {
    remove(index);
  };

  const onReset = () => {
    listReset();
    reset(defaultValues);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    addSubmit: () => onSubmit(),
    edit: async (id) => {
      try {
        const res = await comboItemApi.getById(id);

        if (res.data.data) {
          reset({
            id,
            ...res.data.data,
          });
        }
      } catch (error) {
        noti("error", "Không thể lấy chi tiết combo item");
      }
    },
    saveSubmit: () => onSubmit(true),
  }));

  //#region Render
  const fields = [
    {
      key: "action",
      label: (
        <div className="w-full flex items-center justify-center ">
          <CIconButton
            onClick={onAddGood}
            icon={<i className="fa-lg fa-regular fa-circle-plus"></i>}
          />
        </div>
      ),
      sorter: false,
      _style: { textAlign: "center", width: 80 },
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
        <CIconButton
          color="#F26464"
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
          render={({ field }) => (
            <CSelect
              {...field}
              options={goods_options}
              display="code"
              select="code"
            />
          )}
        />
      </td>
    ),
    name: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`goods.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} options={goods_options} select="code" />
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
            <CSelect
              {...field}
              display="unit"
              options={goods_options}
              readOnly
            />
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
                <CInput {...field} label="Mã combo item" required readOnly />
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
            <div className="h-full flex items-end justify-end">
              <CButton
                onClick={onReset}
                icon={<i className="fa-solid fa-rotate-reverse"></i>}
              >
                Làm mới
              </CButton>
            </div>
          </div>
        </CCardBody>
      </CCard>
      <CCard>
        <h6 className="mb-0 px-4 py-2 font-semibold">
          Danh sách mặt hàng trong combo item
        </h6>

        <CTable data={fieldsForm} fields={fields} render={render} />
      </CCard>
    </div>
  );
  //#endregion
});
