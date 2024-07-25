import { useFieldArray } from "react-hook-form";

import { PTable } from "src/1/common/components/others";

export const StoresTable = ({ control }) => {
  //#region Data
  const { fields } = useFieldArray({
    control,
    name: "stores",
    keyName: "__id",
  });
  //#endregion

  //#region Render
  return (
    <PTable tableBgColor="#f6f7f7">
      <thead>
        <tr>
          <th>Mã chi nhánh</th>
          <th align="left" style={{ minWidth: 200 }}>
            Tên chi nhánh
          </th>
        </tr>
      </thead>
      <tbody>
        {fields?.map((row) => (
          <tr key={row?.code}>
            <td>{row?.code}</td>
            <td>{row?.name}</td>
          </tr>
        ))}
      </tbody>
    </PTable>
  );
  //#endregion
};
