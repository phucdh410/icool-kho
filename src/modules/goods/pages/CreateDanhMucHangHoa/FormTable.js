import { CCard, CCardBody } from "@coreui/react";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { CInput, CNumber, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

export const FormTable = ({ control }) => {
  //#region Data
  const {
    fields: materials,
    append,
    remove,
  } = useFieldArray({ control, name: "materials", keyName: "__id" });

  //#region Event
  const onAddRow = () => {
    append({ code: "", name: "", group: "", amount: 1, don_vi_tinh: "" });
  };

  const onRemoveRow = () => {
    setIsAdding(false);
  };
  //#endregion

  const fields = [
    {
      key: "action",
      label: (
        <button
          onClick={onAddRow}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-regular fa-circle-plus text-2xl text-[#053C7F]"></i>
        </button>
      ),
      _style: { textAlign: "center", width: "140px" },
      sorter: false,
    },
    {
      key: "code",
      label: "Mã NVL",
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { textAlign: "left" },
    },
    {
      key: "group",
      label: "Nhóm NVL",
    },
    {
      key: "amount",
      label: "Số lượng",
    },
    {
      key: "don_vi_tinh",
      label: "ĐVT lưu kho",
    },
  ];

  const render = {
    action: () => (
      <td>
        <button
          onClick={onRemoveRow}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-solid fa-trash-can-xmark text-2xl text-[#F26464]"></i>
        </button>
      </td>
    ),
    code: () => (
      <td>
        <CSelect options={[]} />
      </td>
    ),
    name: () => (
      <td>
        <CSelect options={[]} />
      </td>
    ),
    group: ({ group }) => <td>{group}</td>,
    amount: ({ amount }) => (
      <td>
        <CNumber />
      </td>
    ),
    don_vi_tinh: ({ don_vi_tinh }) => <td>{don_vi_tinh}</td>,
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody className="px-0 pt-3">
          <div className="table-responsive">
            <CTable fields={fields} data={materials} render={render} />
          </div>
        </CCardBody>
      </CCard>

      <div className="mt-3 flex items-center gap-3 font-bold text-xl">
        <span>Tổng cost từ NVL:</span>
        <span>{(50000).toLocaleString("vi-VN")}</span>
      </div>
    </>
  );

  //#endregion
};
