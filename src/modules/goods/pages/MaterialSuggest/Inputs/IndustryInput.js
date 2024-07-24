import { useMemo } from "react";
import { Controller, useController } from "react-hook-form";

import { getAll as getAllMaterialIndustries } from "src/common/queries-fn/material-industry.query";

import { CInput, CSelect } from "_components/controls";

export const IndustryInput = ({ control, isEdit, industryName }) => {
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
      rules={{ required: !isEdit }}
      render={({ field: { onChange, ..._field } }) =>
        isEdit ? (
          <CInput label="Ngành NVL" disabled required value={industryName} />
        ) : (
          <CSelect
            isDisabled={isEdit}
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
        )
      }
    />
  );
};
