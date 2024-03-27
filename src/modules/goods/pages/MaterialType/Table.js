import { useCallback, useState } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination, CTag } from "_components/others";

const MaterialTypeTable = ({ data, isSelectAll, onSelect, loading }) => {
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
      label: "Mã Loại",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Loại",
      _style: { minWidth: "200px", textAlign: "left" },
    },
    {
      key: "materialGroupCode",
      label: "Mã Nhóm NVL",
      _style: { minWidth: "175px" },
    },
    {
      key: "materialGroupName",
      label: "Tên Nhóm NVL",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
    {
      key: "createdBy",
      label: "Người đề xuất",
      _style: { minWidth: "150px" },
    },
    {
      key: "acronym",
      label: "Viết Tắt",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "active",
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
    materialGroupName: ({ materialGroupName }) => (
      <td className="text-left">{materialGroupName}</td>
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

export default MaterialTypeTable;
