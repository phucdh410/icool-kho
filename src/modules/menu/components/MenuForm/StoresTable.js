import { useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import { PTable } from "src/1/common/components/others";
import { CCheckbox } from "src/common/components/controls";
import { getAll } from "src/common/queries-fn/store.query";

export const StoresTable = ({ control }) => {
  //#region Data
  const { data: storesResponse } = getAll();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "stores",
    keyName: "__id",
  });

  const watchFields = useWatch({ control, name: "stores" });

  const currentFields = useMemo(() => {
    if (!storesResponse) return [];

    const mergedArray = [...fields, ...watchFields];
    return storesResponse.map((store) => ({
      checked: mergedArray.some((e) => e === store?.code),
      code: store?.code,
      name: store?.name,
    }));
  }, [storesResponse, fields, watchFields]);

  const isCheckedAll = useMemo(
    () => watchFields?.length === storesResponse?.length,
    [watchFields, storesResponse]
  );
  //#endregion

  //#region Event
  const onCheckAll = () => {
    if (isCheckedAll) {
      replace([]);
    } else {
      const allStoreCodes = storesResponse.map((store) => store?.code);
      replace(allStoreCodes);
    }
  };

  const onCheck = (code) => (check) => {
    if (check) {
      append(code);
    } else {
      const foundIndex = watchFields.findIndex((e) => e === code);

      remove(foundIndex);
    }
  };
  //#endregion

  //#region Render
  return (
    <PTable>
      <thead>
        <tr>
          <th className="pl-4 w-10">
            <CCheckbox value={isCheckedAll} onChange={onCheckAll} />
          </th>
          <th>Mã chi nhánh</th>
          <th align="left" style={{ minWidth: 200 }}>
            Tên chi nhánh
          </th>
        </tr>
      </thead>
      <tbody>
        {currentFields?.map((row, index) => (
          <tr key={row?.code}>
            <td className="pl-4">
              <CCheckbox
                value={isCheckedAll || row?.checked}
                onChange={onCheck(row?.code)}
              />
            </td>
            <td>{row?.code}</td>
            <td>{row?.name}</td>
          </tr>
        ))}
      </tbody>
    </PTable>
  );
  //#endregion
};
