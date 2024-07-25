import { useState } from "react";
import { useFieldArray } from "react-hook-form";

import { CPagination, CTable } from "src/common/components/others";

export const TabGoodsTable = ({ control, priceType }) => {
  //#region Data
  const { fields: fieldsForm } = useFieldArray({
    control,
    name: `goods.${priceType}`,
    keyName: "__id",
  });

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onPageChange = (newPaginate) => {
    setPaginate(newPaginate);
  };
  //#endregion

  //#region Render
  const fields = [
    { key: "code", label: "Mã HH" },
    { key: "name", label: "Tên Hàng Hóa" },
    { key: "formula_unit", label: "Đơn vị tính" },
    { key: "price", label: "Giá bán" },
  ];

  return (
    <CTable
      tableBgColor="#f6f7f7"
      data={fieldsForm}
      page={paginate.page}
      itemsPerPage={paginate.limit}
      fields={fields}
      footer={
        <CPagination
          page={paginate.page}
          total={fieldsForm?.length}
          limit={paginate.limit}
          onPaginationChange={onPageChange}
        />
      }
    />
  );
  //#endregion
};
