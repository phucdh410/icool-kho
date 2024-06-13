import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination, CTag } from "_components/others";

export default ({ isSelectAll, data, onSelect, loading }) => {
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
      label: "Mã HH",
      _style: { width: "20%", minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Hàng Hóa",
      _style: { width: "auto", minWidth: "150px", textAlign: "center" },
    },
    {
      key: "tong_cost",
      label: "Tổng giá trị giá cost",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "don_vi_tinh",
      label: "Đơn vị tính",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "created_by",
      label: "Người đề xuất",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "auto", minWidth: "140px" },
    },
    {
      key: "gia_ban_thuong",
      label: "Giá bán thường",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "gia_ban_le",
      label: "Giá bán lẻ",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "auto", minWidth: "200px" },
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
  };

  return (
    <CTable
      className="selectable"
      loading={loading}
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
