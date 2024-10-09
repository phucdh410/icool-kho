import { useCallback, useState } from "react";

import { money } from "src/utils/funcs";

import { getPreview } from "_common/queries-fn/inventory-check.query";
import { CCheckbox } from "_components/controls";
import { CPagination, CTable } from "_components/others";

import MPreview from "../../../components/Preview/EndOfMonthCheck";

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

  const onPreview = useCallback(
    (code) => (e) => e.preventDefault() || setPreview(code),
    [setPreview]
  );

  const onClose = useCallback(() => setPreview(null), []);

  const select = useCallback(
    (code = -1) =>
      (e) =>
        onSelect(code, e),
    [onSelect]
  );
  //#endregion

  //#region Other
  const mapStatus = (status) => {
    switch (status) {
      case 0:
        return <span className="text-warning">Mới tạo</span>;
      case 1:
        return <span className="text-success">Đã duyệt</span>;
      case -1:
        return <span className="text-danger">Từ chối</span>;
    }
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
      label: "Số phiếu",
      _style: { width: "240px", minWidth: "240px" },
    },
    {
      key: "store_name",
      label: "Chi nhánh",
      _style: { width: "250px", minWidth: "250px", textAlign: "left" },
      sorter: true,
    },
    {
      key: "checked",
      label: "Ngày kiểm",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "created_by",
      label: "Người kiểm",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "approved_status",
      label: "Trạng thái",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "value",
      label: "Thành tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "350px", minWidth: "350px" },
    },
  ];

  const render = {
    select: ({ code, check, status }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} disabled={status} />
      </td>
    ),
    code: ({ code }) => (
      <td>
        <a href={`#preview/${code}`} onClick={onPreview(code)}>
          {code}
        </a>
      </td>
    ),
    approved_status: ({ approved_status }) => (
      <td>{mapStatus(approved_status)}</td>
    ),
    store_name: ({ store_name }) => <td className="text-left">{store_name}</td>,
    value: ({ value }) => (
      <td className="text-right">{value.toLocaleString()}</td>
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
      {preview && (
        <MPreview code={preview} getter={getPreview} onClose={onClose} />
      )}
    </>
  );
  //#endregion
};
