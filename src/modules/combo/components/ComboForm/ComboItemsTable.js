import { Controller, useFieldArray } from "react-hook-form";
import { useQuery } from "react-query";

import { comboItemApi } from "src/1/apis/combo_item.api";
import { CButton, CNumberInput, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

export const ComboItemsTable = ({ control }) => {
  //#region Data
  const {
    fields: fieldsForm,
    append,
    remove,
  } = useFieldArray({ control, name: "combo_items", keyName: "__id" });

  const { data: combo_item_options } = useQuery({
    queryKey: ["danh-sach-combo-items"],
    queryFn: () => comboItemApi.getAll(),
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Event
  const onAddComboItem = () => {
    append({
      code: "",
      quantity: 1,
    });
  };

  const onRemoveComboItem = (index) => () => {
    remove(index);
  };
  //#endregion

  //#region Render
  const fields = [
    {
      key: "action",
      label: (
        <CButton
          onClick={onAddComboItem}
          icon={<i className="text-xl fa-regular fa-circle-plus"></i>}
        />
      ),
      sorter: false,
    },
    {
      key: "code",
      label: "Mã combo item",
    },
    {
      key: "name",
      label: "Tên combo item",
    },
    {
      key: "quantity",
      label: "Số lượng",
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
          onClick={onRemoveComboItem(index)}
          icon={<i className="text-xl fa-solid fa-trash-can"></i>}
        />
      </td>
    ),
    code: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`combo_items.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} options={combo_item_options ?? []} />
          )}
        />
      </td>
    ),
    name: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`combo_items.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={combo_item_options ?? []}
              display="name"
            />
          )}
        />
      </td>
    ),
    quantity: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`combo_items.${index}.quantity`}
          render={({ field }) => <CNumberInput {...field} />}
        />
      </td>
    ),
    unit: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`combo_items.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={combo_item_options ?? []}
              display="unit"
            />
          )}
        />
      </td>
    ),
  };

  return (
    <>
      <CTable fields={fields} render={render} data={fieldsForm} />

      <p className="font-semibold">
        Tổng cost từ combo item: <span>{50000}</span>
      </p>
    </>
  );
  //#endregion
};
