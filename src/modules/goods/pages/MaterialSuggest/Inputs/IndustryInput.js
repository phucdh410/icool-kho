import { Controller, useController } from "react-hook-form";
import { CSelect } from "_components/controls";
import { getAll as getAllMaterialIndustries } from "src/common/queries-fn/material-industry.query";
import { useMemo } from "react";

export const IndustryInput = ({ control }) => {
  const { data: dataIndustry } = getAllMaterialIndustries({ code: "" });

  const industries = useMemo(() => {
    if (dataIndustry && dataIndustry?.length > 0) {
      return dataIndustry.map((e) => ({
        value: e.code,
        acronym: e.acronym,
        label: e.name,
      }));
    }
    return [];
  }, [dataIndustry]);

  const {
    field: { onChange: onChangeNhom },
  } = useController({ control, name: "nhom" });
  const {
    field: { onChange: onChangeLoai },
  } = useController({ control, name: "materialTypeCode" });

  return (
    <Controller
      control={control}
      name="nganh"
      rules={{ required: true }}
      render={({ field: { onChange, ..._field } }) => (
        <CSelect
          label="Ngành NVL"
          options={industries}
          onChange={(option) => {
            onChange(option);
            onChangeNhom("");
            onChangeLoai("");
          }}
          {..._field}
          required
        />
      )}
    />
  );
};
