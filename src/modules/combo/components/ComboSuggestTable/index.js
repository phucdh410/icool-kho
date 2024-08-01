import { useState } from "react";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { CCheckbox } from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";

export const ComboSuggestTable = ({ isSelectAll, data, onSelect, loading }) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onPaginationChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const select =
    (code = -1) =>
    (v) =>
      onSelect(code, v);
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
      label: "Mã Combo",
    },
    {
      key: "name",
      label: "Tên Combo",
    },
    {
      key: "cost",
      label: "Tổng giá trị giá cost",
    },
    {
      key: "unit",
      label: "Đơn vị tính",
    },
    {
      key: "created_by",
      label: "Người đề xuất",
    },
    {
      key: "active",
      label: "Trạng thái",
    },
    {
      key: "from",
      label: "Áp dụng từ ngày",
    },
    {
      key: "to",
      label: "Đến ngày",
    },
    {
      key: "note",
      label: "Ghi chú",
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    from: ({ from }) => <td>{dayjs(from).format("DD/MM/YYYY")}</td>,
    to: ({ to }) => <td>{dayjs(to).format("DD/MM/YYYY")}</td>,
  };

  return (
    <CCard>
      <CCardBody className="pt-0 px-0">
        <div className="mt-3">
          <CTable
            className="selectable"
            loading={loading}
            fields={fields}
            render={render}
            data={data}
            page={paginate?.page}
            itemsPerPage={paginate?.limit}
            footer={
              <CPagination
                page={paginate.page}
                total={data?.length}
                limit={paginate.limit}
                onPaginationChange={onPaginationChange}
              />
            }
          />
        </div>
      </CCardBody>
    </CCard>
  );
  //#endregion
};
