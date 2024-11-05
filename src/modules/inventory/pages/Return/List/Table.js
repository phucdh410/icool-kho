import { useCallback, useRef, useState } from "react";

import { getByCode } from "_common/queries-fn/inventory-return.query";
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
      key: "store_name",
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
      _style: { width: "120px", minWidth: "120px" },
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
    code: ({ id }) => (
      <td>
        <button onClick={onPreview(id)}>{code}</button>
      </td>
    ),
    store_name: ({ store_name }) => <td className="text-left">{store_name}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
    total: ({ total }) => (
      <td className="text-right">{total?.toLocaleString()}</td>
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
            onPaginationChange={onPaginationChange}
          />
        }
      />

      <MPreview ref={previewRef} />
    </>
  );
  //#endregion
};
