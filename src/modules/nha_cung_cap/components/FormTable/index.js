import { CCheckbox } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

const MOCK_DATA = [
  {
    select: false,
    code: "",
    name: "",
    nang_luc_tai_chinh: 10,
    uy_tin_ncc: 10,
    chat_luong: 10,
    gia_ca: 10,
    danh_sach: "Bia tiger, Bia heniken",
    files: [],
  },
];

export const FormTable = () => {
  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã NCC",
    },
    {
      key: "name",
      label: "Tên NCC",
    },
    {
      key: "nang_luc_tai_chinh",
      label: "Năng lực tài chính",
    },
    {
      key: "uy_tin_ncc",
      label: "Uy tín NCC",
    },
    {
      key: "chat_luong",
      label: "Chất lượng",
    },
    {
      key: "gia_ca",
      label: "Giá cả",
    },
    {
      key: "danh_sach",
      label: "Danh sách NVL cung cấp",
    },
    {
      key: "tai_lieu_minh_chung",
      label: "Tài liệu minh chứng",
    },
  ];

  const render = {
    select: () => (
      <td>
        <CCheckbox />
      </td>
    ),
  };

  return (
    <CTable
      className="selectable"
      fields={fields}
      render={render}
      data={MOCK_DATA}
    />
  );
  //#endregion
};
