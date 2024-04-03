import { useRef } from "react";
import { CTable } from "src/common/components/others";
import { MPriceSuggest } from "src/modules/goods/components";

export const PriceTable = ({ code }) => {
  const priceModalRef = useRef();

  const onClick = () => {
    priceModalRef.current?.open(code);
  };

  const fields = [
    {
      key: "remove",
      label: (
        <button
          onClick={onClick}
          style={{
            color: "red",
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
      key: "vendorId",
      label: "Mã NCC",
      _style: { minWidth: "120px" },
    },
    {
      key: "name",
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
      _style: { width: "auto" },
    },
    {
      key: "files",
      label: "Chứng từ đính kèm",
      _style: { minWidth: "150px" },
    },
    {
      key: "note",
      label: "Ghi Chú",
      _style: { width: "auto", minWidth: "200px" },
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <button>Xóa</button>
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
  };

  return (
    <>
      <CTable
        className="selectable"
        loading={false}
        data={[]}
        fields={fields}
        render={render}
      />

      <MPriceSuggest ref={priceModalRef} isShowTable={false} />
    </>
  );
};
