import { useMemo } from "react";

import Row from "./Row";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { getAllTransferMaterials } from "src/apis/material.api";

export default ({ control, fields, update }) => {
  //#region Data
  const fromStoreValue = useWatch({ control, name: "store_from" });
  const toStoreValue = useWatch({ control, name: "store_to" });

  const { data: response, isFetching } = useQuery({
    queryKey: ["transfer-materials", fromStoreValue, toStoreValue],
    queryFn: () =>
      getAllTransferMaterials({
        storeFrom: fromStoreValue,
        storeTo: toStoreValue,
      }),
    enabled: !!fromStoreValue && !!toStoreValue,
  });

  const materials = useMemo(
    () =>
      response?.data?.map((e) => ({ ...e, label: e?.name, value: e?.id })) ||
      [],
    [response]
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <table className="table table-hover border c-table">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          ></th>
          <th style={{ width: "8%", minWidth: "250px", paddingRight: "24px" }}>
            Mã MH
          </th>
          <th
            style={{ width: "auto", minWidth: "450px", paddingRight: "24px" }}
          >
            Tên MH
          </th>
          <th style={{ width: "10%", minWidth: "100px", paddingRight: "24px" }}>
            Số lượng
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
            Đơn giá
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
            Thành tiền
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
            Ghi chú
          </th>
        </tr>
      </thead>
      <tbody>
        {!isFetching ? (
          fields.map((d, index) => (
            <Row
              key={d.__id}
              options={materials}
              index={index}
              control={control}
              update={update}
            />
          ))
        ) : (
          <tr style={{ height: "200px" }}>
            <td colSpan={7}></td>
          </tr>
        )}
      </tbody>
    </table>
  );
  //#endregion
};
