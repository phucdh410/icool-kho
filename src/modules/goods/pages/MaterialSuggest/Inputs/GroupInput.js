import { Controller, useController, useWatch } from "react-hook-form";
import { CSelect } from "_components/controls";
import { getAll as getAllMaterialGroups } from "_common/queries-fn/material-group.query";
import { useMemo } from "react";

export const GroupInput = ({ control }) => {
  const nganhValue = useWatch({ control, name: "nganh" });

  const {
    field: { onChange: onChangeLoai },
  } = useController({ control, name: "materialTypeCode" });

  const { data: dataGroup } = getAllMaterialGroups({
    industryCode: nganhValue?.value,
  });

  const groups = useMemo(() => {
    if (dataGroup && dataGroup?.length > 0) {
      return dataGroup.map((e) => ({
        value: e.code,
        acronym: e.acronym,
        label: e.name,
      }));
    }
    return [];
  }, [dataGroup]);

  return (
    <Controller
      control={control}
      name="nhom"
      rules={{ required: true }}
      render={({ field: { onChange, ..._field } }) => (
        <CSelect
          label="Nhóm NVL"
          options={groups}
          onChange={(option) => {
            onChange(option);
            onChangeLoai("");
          }}
          {..._field}
          required
        />
      )}
    />
  );
};
