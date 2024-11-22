import { useCallback, useRef, useState } from "react";
import dayjs from "dayjs";

import { money } from "src/utils/funcs";

import { CCheckbox } from "_components/controls";
import { CPagination, CTable } from "_components/others";

import MPreview from "../../../components/Preview/Return";

export default ({ data, loading, isSelectAll, onSelect }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const previewRef = useRef(null);
  //#endregion

  //#region Event
  const onPaginationChange = useCallback(
    (_paginate) => setPaginate(_paginate),
    []
  );

  const select = useCallback(
    (code = -1) =>
      (e) =>
        onSelect(code, e),
    [onSelect]
  );

  const onPreview = (id) => () => {
    previewRef.current?.open(id);
  };
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
      label: "Mã Phiếu",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "ware_name",
      label: "Chi nhánh",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
      sorter: true,
    },
    {
      key: "created_date",
      label: "Ngày tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "date",
      label: "Ngày trả",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "total",
      label: "Tổng tiền",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "auto", minWidth: "350px", textAlign: "left" },
    },
  ];

  const render = {
    select: ({ code, check, status }) => (
      <td>
        <CCheckbox
          value={check}
          onChange={select(code)}
          disabled={status === 2}
        />
      </td>
    ),
    code: ({ id, code }) => (
      <td>
        <button onClick={onPreview(id)}>{code}</button>
      </td>
    ),
    ware_name: ({ ware_name }) => <td className="text-left">{ware_name}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
    created_date: ({ created_date }) => (
      <td>{dayjs(created_date).format("DD/MM/YYYY")}</td>
    ),
    date: ({ date }) => <td>{dayjs(date).format("DD/MM/YYYY")}</td>,
    total: ({ total }) => <td className="text-right">{money(total)}</td>,
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
            onPaginationChange={onPaginationChange}
          />
        }
      />

      <MPreview ref={previewRef} />
    </>
  );
  //#endregion
};
