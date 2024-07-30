import { Controller, useFieldArray } from "react-hook-form";
import { useQuery } from "react-query";

import { cuaHangApi } from "src/1/apis/cua_hang.api";
import {
  CButton,
  CCheckbox,
  CNumberInput,
  CSelect,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { WEEKDAYS_OPTIONS } from "src/modules/menu/constants";

export const StoresTable = ({ control }) => {
  //#region Data
  const {
    fields: fieldsForm,
    append,
    remove,
  } = useFieldArray({ control, name: "stores", keyName: "__id" });

  const { data: stores_options } = useQuery({
    queryKey: ["danh-sach-cua-hang"],
    queryFn: () => cuaHangApi.getAll(),
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Event
  const onAddComboItem = () => {
    append({
      code: "",
      price: 0,
      from: 1,
      to: 5,
      is_holiday: false,
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
      label: "Mã chi nhánh",
    },
    {
      key: "name",
      label: "Tên chi nhánh",
    },
    {
      key: "price",
      label: "Giá",
    },
    {
      key: "from",
      label: "Từ",
    },
    {
      key: "to",
      label: "Đến",
    },
    {
      key: "is_holiday",
      label: "Áp dụng lễ",
      sorter: false,
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
          name={`stores.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} options={stores_options ?? []} />
          )}
        />
      </td>
    ),
    name: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`stores.${index}.code`}
          render={({ field }) => (
            <CSelect {...field} options={stores_options ?? []} display="name" />
          )}
        />
      </td>
    ),
    price: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`stores.${index}.price`}
          render={({ field }) => <CNumberInput {...field} />}
        />
      </td>
    ),
    from: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`stores.${index}.from`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={WEEKDAYS_OPTIONS ?? []}
              display="unit"
            />
          )}
        />
      </td>
    ),
    to: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`stores.${index}.to`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={WEEKDAYS_OPTIONS ?? []}
              display="unit"
            />
          )}
        />
      </td>
    ),
    is_holiday: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`stores.${index}.is_holiday`}
          render={({ field }) => <CCheckbox {...field} />}
        />
      </td>
    ),
  };

  return (
    <>
      <CTable fields={fields} render={render} data={fieldsForm} />
    </>
  );
  //#endregion
};
