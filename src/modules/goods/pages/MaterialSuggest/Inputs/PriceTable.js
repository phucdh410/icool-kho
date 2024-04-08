import { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  confirmPriceSuggest,
  removeMaterialSuggest,
  removePriceSuggest,
} from "src/apis/material_suggest.api";
import { Checked, Uncheck } from "src/common/assets/icons";
import { CButton } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { MPriceSuggest } from "src/modules/goods/components";

export const PriceTable = ({ code, control, refetch }) => {
  const role = useSelector((state) => state?.auth?.role);

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

  const onConfirm = (id) => async () => {
    try {
      await confirmPriceSuggest(id);

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
      _style: { minWidth: "150px", textAlign: "left" },
    },
    {
      key: "price",
      label: "Đơn Giá",
      _style: { minWidth: "120px" },
    },
    {
      key: "unit",
      label: "ĐVBG",
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
    {
      key: "wareChoice",
      label: "KTT chọn",
      _style: { width: "auto" },
      sorter: false,
    },
    {
      key: "accountantChoice",
      label: "Kế toán chọn",
      _style: { width: "auto" },
      sorter: false,
    },
    {
      key: "confirm",
      label: "Xác nhận BGĐ",
      _style: { width: "auto" },
      sorter: false,
    },
    ,
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
    wareChoice: ({ id, wareChoice }) =>
      role === "STOCKER" ? (
        <td>
          <CButton
            color={wareChoice ? "success" : "primary"}
            onClick={onConfirm(id)}
          >
            Xác nhận
          </CButton>
        </td>
      ) : (
        <td>{wareChoice ? "Đã chọn" : ""}</td>
      ),
    accountantChoice: ({ id, accountantChoice }) =>
      role === "ACCOUNTER" ? (
        <td>
          <CButton
            color={accountantChoice ? "success" : "primary"}
            onClick={onConfirm(id)}
          >
            Xác nhận
          </CButton>
        </td>
      ) : (
        <td>{accountantChoice ? "Đã chọn" : ""}</td>
      ),
    confirm: ({ id, confirm }) =>
      role === "OPERATOR" ? (
        <td>
          <CButton
            color={confirm ? "success" : "primary"}
            onClick={onConfirm(id)}
          >
            Xác nhận
          </CButton>
        </td>
      ) : (
        <td>{confirm ? "Đã chọn" : ""}</td>
      ),
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
        code={code}
      />
    </>
  );
};
