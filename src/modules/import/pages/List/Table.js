import { useCallback, useRef, useState } from "react";

import { CCheckbox } from "_components/controls";
import { CPagination, CTable } from "_components/others";

import MPreview from "../../components/Preview";

export default ({ data, loading, isSelectAll, onSelect }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const modalRef = useRef(null);
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
  //#endregion

  //#region Others
  const mapStatus = ({ approvedStatus }) => {
    switch (approvedStatus) {
      case 1:
      case 2:
        return (
          <td className="text-center font-weight-medium text-success">
            Đã lưu kho
          </td>
        );
      default:
        return (
          <td className="text-center font-weight-medium text-warning">
            Mới tạo
          </td>
        );
    }
  };
  //#endregion

  //#region Render
  const fields = [
    {
      key: "select",
      label: (
        <div style={{ width: "100%" }}>
          <CCheckbox value={isSelectAll} onChange={select()} />
        </div>
      ),
      sorter: false,
    },
    {
      key: "code",
      label: "Số ĐH",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "store_name",
      label: "Chi nhánh",
      _style: { width: "auto%", minWidth: "250px", textAlign: "left" },
      sorter: true,
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "150px", minWidth: "150px", textAlign: "center" },
    },
    {
      key: "created_date",
      label: "Ngày tạo",
      _style: { width: "140px", minWidth: "140px" },
    },
    {
      key: "date",
      label: "Ngày giao",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
    {
      key: "total",
      label: "Thành tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "auto", minWidth: "350px", textAlign: "left" },
    },
  ];

  const render = {
    select: ({ check, code, approvedStatus }) => (
      <td>
        <CCheckbox
          value={check}
          onChange={select(code)}
          disabled={approvedStatus}
        />
      </td>
    ),
    code: (item) => (
      <td>
        <a href="#" onClick={() => modalRef.current?.open(item?.id)}>
          {item.code}
        </a>
      </td>
    ),
    store_name: ({ store_name }) => <td className="text-left">{store_name}</td>,
    total: ({ total }) => (
      <td className="text-right pr-4">{total?.toLocaleString()}</td>
    ),
    note: ({ note }) => <td className="text-left">{note}</td>,
    status: mapStatus,
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
      <MPreview ref={modalRef} />
    </>
  );
  //#endregion
};
