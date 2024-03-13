import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

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
      label: "Mã NVL",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
    {
      key: "don_gia_de_xuat",
      label: "Đơn giá đề xuất",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "don_vi_mua_hang",
      label: "Đơn vị mua hàng",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "created_by",
      label: "Người Đề Xuất",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "status",
      label: "Trạng Thái",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "nha_cung_cap_de_xuat",
      label: "Nhà cung cấp đề xuất",
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
