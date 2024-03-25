import { useState } from "react";
import { CButton, CInput, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

const MOCK = [
  { code: "UVK", name: "Ung Văn Khiêm" },
  { code: "XVNT", name: "Xô Viết Nghệ Tĩnh" },
  { code: "TN", name: "Trần Não" },
  { code: "MDC", name: "Mạc Đỉnh Chi" },
  { code: "CCY", name: "Cầu Chữ Y" },
  { code: "DBT", name: "Dương Bá Trạc" },
];

export const FormTable = () => {
  //#region Data
  const fields = [
    {
      key: "remove",
      label: <CButton color="error">Thêm</CButton>,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã Chi Nhánh",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Chi Nhánh",
      _style: { width: "auto", minWidth: "200px", textAlign: "center" },
    },
  ];

  const render = {
    remove: ({ code }) => (
      <td>
        <CButton color="error">Xóa</CButton>
      </td>
    ),
  };
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <CTable
        className="selectable"
        data={MOCK || data}
        page={1}
        itemsPerPage={9999}
        fields={fields}
        render={render}
        footer={
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <CSelect />
            <CSelect />
          </div>
        }
      />
    </>
  );
  //#endregion
};
