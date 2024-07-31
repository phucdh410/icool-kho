import { useRef } from "react";
import { useFieldArray } from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import { CIconButton } from "src/1/common/components/controls";
import { CTable } from "src/common/components/others";

import { ComboItemModal } from "./Modal";

export const ComboItemsTable = ({ control }) => {
  //#region Data
  const addModalRef = useRef(null);

  const {
    fields: fieldsForm,
    replace,
    remove,
  } = useFieldArray({ control, name: "items", keyName: "__id" });
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
      label: "Mã combo item",
      _style: { width: 160 },
      sorter: false,
    },
    {
      key: "name",
      label: "Tên combo item",
      _style: { width: 160 },
      sorter: false,
    },
    {
      key: "quantity",
      label: "Số lượng",
      _style: { width: 120 },
      sorter: false,
    },
    {
      key: "unit",
      label: "Đơn vị tính",
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
  };

  return (
    <CCard>
      <CCardBody>
        <CTable fields={fields} render={render} data={fieldsForm} />

        <p className="font-semibold m-0 mt-2">
          Tổng cost từ combo item:{" "}
          <span>
            {fieldsForm?.reduce((prev, cur) => prev + cur?.cost ?? 0, 0)}
          </span>
        </p>

        <ComboItemModal ref={addModalRef} getAddedData={getAddedData} />
      </CCardBody>
    </CCard>
  );
  //#endregion
};
