import { useCallback, useState } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination, CTag } from "_components/others";

const MaterialGroupTable = ({ data, isSelectAll, onSelect, loading }) => {
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
      label: "Mã Nhóm",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Nhóm",
      _style: { minWidth: "200px", textAlign: "left" },
    },
    {
      key: "industryCode",
      label: "Mã Ngành Hàng Hóa",
      _style: { minWidth: "175px" },
    },
    {
      key: "industryName",
      label: "Tên Ngành Hàng Hóa",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
    {
      key: "created_by",
      label: "Người đề xuất",
      _style: { minWidth: "150px" },
    },
    {
      key: "acronym",
      label: "Viết Tắt",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "status",
      label: "Trạng Thái",
      _style: { width: "auto", minWidth: "200px" },
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
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    code: ({ code }) => <td>{code}</td>,
    name: ({ name }) => <td className="text-left">{name}</td>,
    industryName: ({ industryName }) => (
      <td className="text-left">{industryName}</td>
    ),
    active: ({ active }) => (
      <td>
        <CTag
          label={active ? "Hoạt động" : "Ẩn"}
          color={!active && "#FF8080"}
        />
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

export default MaterialGroupTable;
