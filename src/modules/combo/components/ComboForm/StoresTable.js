import { useRef } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useQuery } from "react-query";

import { CCard, CCardBody } from "@coreui/react";

import { cuaHangApi } from "src/1/apis/cua_hang.api";
import { CIconButton } from "src/1/common/components/controls";
import {
  CButton,
  CCheckbox,
  CNumberInput,
  CSelect,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { WEEKDAYS_OPTIONS } from "src/modules/menu/constants";

import { StoresModal } from "./Modal";

export const StoresTable = ({ control }) => {
  //#region Data
  const addModalRef = useRef(null);

  const {
    fields: fieldsForm,
    replace,
    remove,
  } = useFieldArray({ control, name: "stores", keyName: "__id" });

  //#endregion

  //#region Event
  const onAddComboItem = () => {
    addModalRef.current?.open();
  };

  const onRemoveComboItem = (index) => () => {
    remove(index);
  };

  const getAddedData = (newItems) => {
    const combined = new Map();
    fieldsForm.forEach((e) => {
      combined.set(e?.code, e);
    });
    newItems.forEach((e) => {
      combined.set(e?.code, e);
    });
    const result = Array.from(combined.values());
    replace(result);
  };
  //#endregion

  //#region Render
  const fields = [
    {
      key: "action",
      label: (
        <CIconButton
          onClick={onAddComboItem}
          icon={<i className="text-xl fa-regular fa-circle-plus"></i>}
        />
      ),
      sorter: false,
    },
    {
      key: "code",
      label: "Mã chi nhánh",
      sorter: false,
    },
    {
      key: "name",
      label: "Tên chi nhánh",
      sorter: false,
    },
    {
      key: "price",
      label: "Giá",
      sorter: false,
    },
    {
      key: "from",
      label: "Từ",
      sorter: false,
    },
    {
      key: "to",
      label: "Đến",
      sorter: false,
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
        <CIconButton
          color="error"
          onClick={onRemoveComboItem(index)}
          icon={<i className="text-xl fa-solid fa-trash-can"></i>}
        />
      </td>
    ),
    price: ({ price }) => <td>{price.toLocaleString()}</td>,
    from: ({ from }) => (
      <td>{WEEKDAYS_OPTIONS.find((e) => e?.value === from)?.label}</td>
    ),
    to: ({ to }) => (
      <td>{WEEKDAYS_OPTIONS.find((e) => e?.value === to)?.label}</td>
    ),
    is_holiday: (record, index) => (
      <td>
        <div className="flex items-center justify-center">
          <Controller
            control={control}
            name={`stores.${index}.is_holiday`}
            render={({ field }) => <CCheckbox {...field} />}
          />
        </div>
      </td>
    ),
  };

  return (
    <CCard>
      <CCardBody>
        <CTable fields={fields} render={render} data={fieldsForm} />

        <StoresModal ref={addModalRef} getAddedData={getAddedData} />
      </CCardBody>
    </CCard>
  );
  //#endregion
};
