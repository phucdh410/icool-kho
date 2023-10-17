import { useState, useCallback } from "react";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

import MQuantitativePreview from "../../components/QuantitativePreview";

import { getPreview } from "_common/queries-fn/purchase-proposal-form.query";
import { format } from "src/utils/moment";

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

  //#region Others
  const mapStatus = (status) => {
    switch (status) {
      case 1:
        return (
          <td className="pr-4 font-weight-medium text-center text-success">
            Thành công
          </td>
        );
      case 2:
        return (
          <td className="pr-4 font-weight-medium text-center text-danger">
            Không thành công
          </td>
        );

      default:
        return (
          <td className="pr-4 font-weight-medium text-center text-warning">
            Đang cập nhật
          </td>
        );
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
      label: "Số Chứng Từ",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "storeName",
      label: "Chi nhánh",
      _style: { width: "250px", minWidth: "250px", textAlign: "start" },
    },
    {
      key: "creator",
      label: "Người tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "createdDate",
      label: "Ngày tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "auto", minWidth: "350px", textAlign: "start" },
    },
  ];

  const render = {
    select: ({ code, check }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    code: ({ code }) => (
      <td>
        <a href={`#preview/${code}`} onClick={onPreview(code)}>
          {code}
        </a>
      </td>
    ),
    status: ({ status }) => mapStatus(status),
    createdDate: ({ createdDate }) => (
      <td>{format(createdDate, "DD/MM/YYYY HH:mm:ss")}</td>
    ),
    storeName: ({ storeName }) => <td className="text-left">{storeName}</td>,
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
            onPaginationChange={onPaginationChange}
          />
        }
      />

      {preview && (
        <MQuantitativePreview
          code={preview}
          getter={getPreview}
          onClose={onClose}
        />
      )}
    </>
  );
  //#endregion
};
