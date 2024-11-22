import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { CCheckbox } from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";

export const ListTable = ({ data = [], loading, isSelectAll, onSelect }) => {
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
      label: "Số phiếu",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "cycle",
      label: "Kỳ đánh giá",
      _style: { width: "130px", minWidth: "130px" },
    },
    {
      key: "year",
      label: "Năm",
      _style: { width: "130px", minWidth: "130px" },
    },
    {
      key: "evaluation_date",
      label: "Ngày đánh giá",
      _style: { width: "250px", minWidth: "250px" },
    },
    {
      key: "goods",
      label: "Số hàng hóa",
      _style: { width: "170px", minWidth: "170px" },
    },
    {
      key: "pass",
      label: "NCC đạt",
      _style: { width: "170px", minWidth: "170px" },
    },
    {
      key: "fail",
      label: "NCC không đạt",
      _style: { width: "170px", minWidth: "170px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "250px", minWidth: "250px", textAlign: "left" },
    },
  ];

  const render = {
    select: ({ code, status, check }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    code: ({ code, id }) => (
      <td>
        <Link to={`/goods-quality/rating/${id}`}>{code}</Link>
      </td>
    ),
    evaluation_date: ({ evaluation_date }) => (
      <td>{dayjs(evaluation_date).format("DD/MM/YYYY")}</td>
    ),
    note: ({ note }) => <td className="text-left">{note}</td>,
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
