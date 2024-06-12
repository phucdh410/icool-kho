import { useCallback, useState } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

import MPreview from "../../../components/Preview/Check";

import { money } from "src/utils/funcs";
import { getPreview } from "_common/queries-fn/inventory-check.query";

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
        return <span className="text-danger">Chờ xác nhận</span>;
      case 1:
        return <span className="text-success">Quản lý đã duyệt</span>;
      case 2:
        return <span className="text-warning">Quản lý từ chối</span>;
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
      key: "storeName",
      label: "Chi nhánh",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
      sorter: true,
    },
    {
      key: "checked",
      label: "Ngày kiểm",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "createdBy",
      label: "Người kiểm",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "value",
      label: "Thành tiền",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "150px", minWidth: "150px" },
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
    status: ({ status }) => <td>{mapStatus(status)}</td>,
    storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
    value: ({ value }) => <td>{money(value)}</td>,
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
