import { useState } from "react";

import { CCard, CCardBody } from "@coreui/react";

import { CCheckbox } from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";

export const ComboItemTable = ({
  data = [],
  loading,
  isSelectAll,
  onSelect,
}) => {
  //#region Data
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onPageChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const select =
    (code = -1) =>
    (e) =>
      onSelect(code, e);
  //#endregion

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectAll} onChange={select()} />,
      sorter: false,
    },
    { key: "code", label: "Mã combo item" },
    { key: "name", label: "Tên combo item" },
  ];

  const render = {
    select: ({ code, status, check }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
  };

  return (
    <CCard>
      <CCardBody>
        <CTable
          className="selectable"
          data={data}
          loading={loading}
          fields={fields}
          render={render}
          page={paginate.page}
          itemsPerPage={paginate.limit}
          footer={
            <CPagination
              page={paginate.page}
              total={data?.length}
              limit={paginate.limit}
              onPaginationChange={onPageChange}
            />
          }
        />
      </CCardBody>
    </CCard>
  );
  //#endregion
};
