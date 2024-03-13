import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

export default ({ isSelectAll, data, onSelect }) => {
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const onPaginationChange = useCallback(
    (_paginate) => setPaginate(_paginate),
    []
  );

  const select =
    (code = -1) =>
    (v) =>
      onSelect(code, v);

  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectAll} onChange={select()} />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã Ngành NVL",
      _style: { width: "20%", minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Ngành NVL",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
    {
      key: "nguoi_de_xuat",
      label: "Người Đề Xuất",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "viet_tat",
      label: "Viết Tắt",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "trang_thai",
      label: "Trạng Thái",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "ghi_chu",
      label: "Ghi Chú",
      _style: { width: "auto", minWidth: "200px" },
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
  };

  return (
    <CTable
      className="selectable"
      data={data}
      page={paginate.page}
      itemsPerPage={paginate.limit}
      fields={fields}
      render={render}
      footer={
        <CPagination
          page={paginate.page}
          total={data?.length}
          limit={paginate.limit}
          onPaginationChange={onPaginationChange}
        />
      }
    />
  );
};
