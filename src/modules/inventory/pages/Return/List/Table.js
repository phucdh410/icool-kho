import { useCallback, useState } from "react";

import { money } from "src/utils/funcs/";

import { getByCode } from "_common/queries-fn/inventory-return.query";
import { CCheckbox } from "_components/controls";
import { CPagination,CTable } from "_components/others";

import MPreview from "../../../components/Preview/Return";

export default ({ data, loading, isSelectAll, onSelect }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const [preview, setPreview] = useState(null);
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

  const onPreview = useCallback(
    (code) => (e) => e.preventDefault() || setPreview(code),
    [setPreview]
  );

  const onClose = useCallback(() => setPreview(null), []);
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
      key: "storeName",
      label: "Chi nhánh",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
      sorter: true,
    },
    {
      key: "createdDate",
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
    code: ({ code }) => (
      <td>
        <a href={`#preview/${code}`} onClick={onPreview(code)}>
          {code}
        </a>
      </td>
    ),
    storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
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
      {preview && (
        <MPreview code={preview} getter={getByCode} onClose={onClose} />
      )}
    </>
  );
  //#endregion
};
