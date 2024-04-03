import { CButton } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

export const MTable = ({ code, data }) => {
  //#region Data
  const fields = [
    {
      key: "remove",
      label: "",
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
    remove: ({ check, code }) => (
      <td>
        <CButton color="danger">Xóa</CButton>
      </td>
    ),
    files: ({ files }) => (
      <td>
        {files?.length > 0 &&
          files.map((e) => (
            <a
              key={e?.id}
              href={e?.path}
              target="_blank"
              rel="noopenner noreferrer"
            >
              {e?.filename}
            </a>
          ))}
      </td>
    ),
    supplierName: ({ supplierName }) => (
      <td className="text-left">{supplierName}</td>
    ),
  };
  //#endregion

  //#region Render
  return (
    <CTable
      className="selectable"
      loading={false}
      data={data}
      fields={fields}
      render={render}
    />
  );
  //#endregion
};
