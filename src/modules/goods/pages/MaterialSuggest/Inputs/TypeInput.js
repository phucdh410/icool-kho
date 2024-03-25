import { Controller, useController, useWatch } from "react-hook-form";
import { CSelect } from "_components/controls";
import { getAllMaterialTypes } from "_common/queries-fn/material-type.query";
import { useMemo } from "react";

export const TypeInput = ({ control }) => {
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
      rules={{ required: true }}
      render={({ field }) => (
        <CSelect label="Loại NVL" options={types} {...field} required />
      )}
    />
  );
};
