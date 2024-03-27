import { CTable } from "src/common/components/others";

export const MTable = ({ code }) => {
  //#region Data
  const fields = [
    {
      key: "remove",
      label: "",
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

  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <CTable
      className="selectable"
      loading={false}
      data={[]}
      // page={paginate.page}
      // itemsPerPage={paginate.limit}
      fields={fields}
      render={render}
    />
  );
  //#endregion
};
