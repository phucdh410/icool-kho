import { useMemo } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { getAllMaterialTypes } from "_common/queries-fn/material-type.query";
import { CInput, CSelect } from "_components/controls";

export const TypeInput = ({ control, isEdit, materialTypeName }) => {
  const nhomValue = useWatch({ control, name: "nhom" });

  const { data: dataType } = getAllMaterialTypes({
    materialGroupCode: nhomValue?.value,
  });

  const types = useMemo(() => {
    if (dataType && dataType?.length > 0) {
      return dataType.map((e) => ({
        value: e.code,
        acronym: e.acronym,
        label: e.name,
      }));
    }
    return [];
  }, [dataType]);

  return (
    <Controller
      control={control}
      name="materialTypeCode"
      rules={{ required: !isEdit }}
      render={({ field }) =>
        isEdit ? (
          <CInput label="Loại NVL" disabled required value={materialTypeName} />
        ) : (
          <CSelect label="Loại NVL" options={types} {...field} required />
        )
      }
    />
  );
};
