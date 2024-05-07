import { useState, useCallback } from "react";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";

import { CCheckbox } from "_components/controls";
import { CTable, CPagination } from "_components/others";

import MPreview from "../../components/Preview";

import { isCentral, money } from "../../../../utils/funcs";
import { getPreview } from "_common/queries-fn/purchase-proposal-form.query";
import dayjs from "dayjs";

const selectStoreCode = createSelector(
  (state) => state.auth,
  ({ storeCode }) => storeCode
);

export default ({ data, loading, isSelectAll, onSelect }) => {
  //#region Data
  const storeCode = useSelector(selectStoreCode);

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
      case -3:
        return (
          <td className="pr-4 font-weight-medium text-center text-danger">
            Mới tạo
          </td>
        );
      case -2:
      case -1:
        return (
          <td className="pr-4 font-weight-medium text-center text-danger">
            Từ chối
          </td>
        );
      case 1:
        if (isCentral(storeCode)) {
          return (
            <td className="pr-4 font-weight-medium text-center text-warning">
              Chờ xác nhận
            </td>
          );
        }
      case 2:
        return (
          <td className="pr-4 font-weight-medium text-center text-success">
            Đã duyệt
          </td>
        );

      default:
        return (
          <td className="pr-4 font-weight-medium text-center text-warning">
            {isCentral(storeCode) ? "Chờ duyệt" : "Mới tạo"}
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
      label: "Số ĐH",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "store_from",
      label: "Chi nhánh chuyển",
      _style: { width: "250px", minWidth: "250px", textAlign: "start" },
    },
    {
      key: "store_to",
      label: "Chi nhánh nhận",
      _style: { width: "250px", minWidth: "250px", textAlign: "start" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "created_date",
      label: "Ngày tạo",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "created_by",
      label: "Người tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "total",
      label: "Thành tiền",
      _style: {
        width: "140px",
        minWidth: "140px",
      },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "auto", minWidth: "350px", textAlign: "start" },
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
    code: ({ code }) => (
      <td>
        <a href={`#preview/${code}`} onClick={onPreview(code)}>
          {code}
        </a>
      </td>
    ),
    status: ({ status }) => mapStatus(status),
    created_date: ({ created_date }) => (
      <td>{dayjs(created_date).format("DD/MM/YYYY")}</td>
    ),
    store_from: ({ store_from }) => (
      <td className="text-left">{store_from?.name}</td>
    ),
    store_to: ({ store_to }) => <td className="text-left">{store_to?.name}</td>,
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
        <MPreview code={preview} getter={getPreview} onClose={onClose} />
      )}
    </>
  );
  //#endregion
};
