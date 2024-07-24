import { useCallback,useState } from "react";

import { format } from "src/utils/moment";

import { getQuantitativePreview } from "_common/queries-fn/purchase-proposal-form.query";
import { CCheckbox } from "_components/controls";
import { CPagination,CTable } from "_components/others";

import MQuantitativePreview from "../../components/QuantitativePreview";

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
    (id) => (e) => e.preventDefault() || setPreview(id),
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
          <td className="pr-4 font-weight-medium text-center text-success">
            Thành công
          </td>
          // <td className="pr-4 font-weight-medium text-center text-danger">
          //   Không thành công
          // </td>
        );

      default:
        return (
          <td className="pr-4 font-weight-medium text-center text-success">
            Thành công
          </td>
          // <td className="pr-4 font-weight-medium text-center text-warning">
          //   Đang cập nhật
          // </td>
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
      key: "name",
      label: "Chi nhánh",
      _style: { width: "250px", minWidth: "250px", textAlign: "start" },
    },
    {
      key: "created_by",
      label: "Người tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "created_date",
      label: "Ngày tạo",
      _style: { width: "200px", minWidth: "200px" },
    },
    {
      key: "updated_date",
      label: "Ngày cập nhật định lượng",
      _style: { width: "260px", minWidth: "260px" },
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
    code: ({ code, id }) => (
      <td>
        <a href={`#preview/${id}`} onClick={onPreview(id)}>
          {code}
        </a>
      </td>
    ),
    status: ({ status }) => mapStatus(status),
    created_date: ({ created_date }) => (
      <td>{format(created_date, "DD/MM/YYYY HH:mm:ss")}</td>
    ),
    updated_date: ({ updated_date }) => (
      <td>{format(updated_date, "DD/MM/YYYY")}</td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
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
          getter={getQuantitativePreview}
          onClose={onClose}
        />
      )}
    </>
  );
  //#endregion
};
