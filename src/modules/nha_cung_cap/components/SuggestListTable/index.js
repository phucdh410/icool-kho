import { useState } from "react";
import dayjs from "dayjs";

import { CCheckbox } from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";

export const SuggestListTable = ({
  data = [],
  loading,
  isSelectAll,
  onSelect,
}) => {
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
      _style: { width: "350px", minWidth: "350px", textAlign: "start" },
    },
    {
      key: "year",
      label: "Năm",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "date",
      label: "Ngày đánh giá",
      _style: { width: "250px", minWidth: "250px" },
    },
    {
      key: "suppliers",
      label: "Số nhà cung cấp",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "success_suppliers",
      label: "NCC đạt",
      _style: { width: "200px", minWidth: "170px" },
    },
    {
      key: "failed_suppliers",
      label: "NCC không đạt",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "140px", minWidth: "140px" },
    },
  ];

  const render = {
    select: ({ code, status, check }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    code: ({ code }) => (
      <td>
        <a href={`/suppliers-suggest/rating/${code}`}>{code}</a>
      </td>
    ),
    date: ({ date }) => <td>{dayjs(date).format("DD/MM/YYYY")}</td>,
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
