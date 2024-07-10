import dayjs from "dayjs";
import { useState } from "react";
import { mapStatusText, mapWeekday } from "../../func";
import { CPagination, CTable } from "src/common/components/others";
import { CCheckbox } from "src/common/components/controls";

export const MenuTable = ({ data = [], loading, isSelectAll, onSelect }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onPageChange = (_paginate) => setPaginate(_paginate);

  const select =
    (code = -1) =>
    (e) =>
      onSelect(code, e);
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
      label: "Code",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "name",
      label: "Tên menu",
      _style: { width: "250px", minWidth: "250px", textAlign: "start" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "created_date",
      label: "Ngày tạo",
      _style: { width: "250px", minWidth: "250px" },
    },
    {
      key: "created_by",
      label: "Người tạo",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "date",
      label: "Ngày áp dụng",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "from",
      label: "Thời gian",
      sorter: false,
      _style: { width: "140px", minWidth: "140px" },
    },
  ];

  const render = {
    select: ({ code, status, check }) => (
      <td>
        <CCheckbox
          value={check}
          onChange={select(code)}
          disabled={status || status === -3}
        />
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
    status: ({ status }) => <td>{mapStatusText(status)}</td>,
    created_date: ({ created_date }) => (
      <td>{dayjs(created_date).format("DD/MM/YYYY HH:mm:ss")}</td>
    ),
    date: ({ date }) => <td>{dayjs(date).format("DD/MM/YYYY")}</td>,
    from: ({ from, to }) => (
      <td>{`${mapWeekday(from)} -> ${mapWeekday(to)}`}</td>
    ),
  };

  return (
    <>
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
            onPaginationChange={onPageChange}
          />
        }
      />
    </>
  );
  //#endregion
};
