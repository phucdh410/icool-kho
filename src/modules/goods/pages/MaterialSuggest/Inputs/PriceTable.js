import { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import {
  removeMaterialSuggest,
  removePriceSuggest,
} from "src/apis/material_suggest.api";
import { CButton } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { MPriceSuggest } from "src/modules/goods/components";

const isBGD = true;

export const PriceTable = ({ code, control, refetch }) => {
  const priceModalRef = useRef();

  const { fields: suppliers } = useFieldArray({
    control,
    name: "suppliers",
    keyName: "_id",
  });

  const onClick = () => {
    priceModalRef.current?.open(code);
  };

  const onRemove = (id) => async () => {
    try {
      await removePriceSuggest(id);

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const fields = [
    {
      key: "action",
      label: (
        <button
          onClick={onClick}
          style={{
            color: "green",
            fontWeight: "700",
            fontSize: "22px",
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent",
          }}
        >
          +
        </button>
      ),
      sorter: false,
    },
    {
      key: "supplierCode",
      label: "Mã NCC",
      _style: { minWidth: "120px" },
    },
    {
      key: "supplierName",
      label: "Tên NCC",
      _style: { minWidth: "200px", textAlign: "left" },
    },
    {
      key: "price",
      label: "Đơn Giá",
      _style: { minWidth: "120px" },
    },
    {
      key: "unit",
      label: "Đơn vị báo giá",
      _style: { width: "110px", maxWidth: "110px" },
      sorter: false,
    },
    {
      key: "files",
      label: "Chứng từ đính kèm",
      _style: { width: "140px", maxWidth: "140px" },
      sorter: false,
    },
    {
      key: "note",
      label: "Ghi Chú",
      _style: { width: "auto", minWidth: "200px" },
    },
    ...(isBGD && [
      {
        key: "operator",
        label: "Xác nhận BGĐ",
        _style: { width: "auto" },
      },
    ]),
  ];

  const render = {
    action: ({ id }) => (
      <td>
        <button
          onClick={onRemove(id)}
          style={{
            color: "red",
            fontWeight: "700",
            fontSize: "14px",
            outline: "none",
            boxShadow: "none",
            border: "none",
            background: "transparent",
          }}
        >
          Xóa
        </button>
      </td>
    ),
    files: ({ files }) => (
      <td
        style={{
          width: "140px",
          maxWidth: "140px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {files?.length > 0 &&
          files.map((e) => (
            <a
              key={e?.id}
              href={e?.path}
              target="_blank"
              rel="noopenner noreferrer"
              aria-label="AHGAHAHS"
            >
              {e?.filename}
            </a>
          ))}
      </td>
    ),
    supplierName: ({ supplierName }) => (
      <td className="text-left">{supplierName}</td>
    ),
    ...(isBGD && {
      operator: () => (
        <td>
          <CButton color="primary">Xác nhận</CButton>
        </td>
      ),
    }),
  };

  return (
    <>
      <CTable
        className="selectable"
        loading={false}
        data={suppliers}
        fields={fields}
        render={render}
      />

      <MPriceSuggest
        ref={priceModalRef}
        isShowTable={false}
        refetch={refetch}
      />
    </>
  );
};
