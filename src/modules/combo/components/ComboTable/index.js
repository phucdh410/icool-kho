import { useState } from "react";

import { CCard } from "@coreui/react";

import { CCheckbox } from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";
import { money } from "src/utils/funcs";

export const ComboTable = ({ isSelectAll, data, onSelect, loading }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onPaginationChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const select =
    (code = -1) =>
    (v) =>
      onSelect(code, v);
  //#endregion

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectAll} onChange={select()} />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã Combo",
      _style: { textAlign: "left" },
    },
    {
      key: "name",
      label: "Tên Combo",
      _style: { textAlign: "left" },
    },
    {
      key: "cost",
      label: "Tổng giá trị giá cost",
      _style: { textAlign: "right" },
    },
    {
      key: "unit",
      label: "Đơn vị tính",
    },
    {
      key: "created_by",
      label: "Người đề xuất",
      _style: { textAlign: "left" },
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key: "start",
      label: "Áp dụng từ ngày",
    },
    {
      key: "end",
      label: "Đến ngày",
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { textAlign: "left" },
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    code: ({ code }) => <td className="text-left">{code}</td>,
    name: ({ name }) => <td className="text-left">{name}</td>,
    cost: ({ cost }) => <td className="text-right">{money(cost)}</td>,
    created_by: ({ created_by }) => <td className="text-left">{created_by}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
  };

  return (
    <CCard>
      <div className="mt-3">
        <CTable
          className="selectable"
          loading={loading}
          fields={fields}
          render={render}
          data={data}
          page={paginate?.page}
          itemsPerPage={paginate?.limit}
          footer={
            <CPagination
              page={paginate.page}
              total={data?.length}
              limit={paginate.limit}
              onPaginationChange={onPaginationChange}
            />
          }
        />
      </div>
    </CCard>
  );
  //#endregion
};
