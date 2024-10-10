import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { CCheckbox, CInput, CNumberInput, CSelect } from "_components/controls";

export default ({ control, index, materials, setValue }) => {
  //#region Data
  const ware_q = useWatch({ control, name: `materials.${index}.ware_q` });
  const price = useWatch({ control, name: `materials.${index}.price` });

  const total = useMemo(() => (ware_q ?? 0) * (price ?? 0), [ware_q, price]);
  //#endregion

  //#region Event
  const onMaterialChange = (onChangeCallback) => (selectedOption) => {
    onChangeCallback(selectedOption?.value);
    setValue(`materials.${index}.ware_unit`, selectedOption?.wareUnit);
    setValue(`materials.${index}.unit`, selectedOption?.unit);
    setValue(`materials.${index}.price`, selectedOption?.price);
  };
  //#endregion

  //#region Render
  return (
    <tr>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.checked`}
          render={({ field }) => <CCheckbox {...field} />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field: { onChange, ..._field } }) => (
            <CSelect
              {..._field}
              display="code"
              get="value"
              options={materials}
              onChange={onMaterialChange(onChange)}
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field: { onChange, ..._field } }) => (
            <CSelect
              {..._field}
              get="value"
              options={materials}
              onChange={onMaterialChange(onChange)}
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.ware_unit`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.ware_q`}
          render={({ field }) => <CNumberInput {...field} />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.price`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <CInput value={total} disabled />
      </td>
    </tr>
  );
  //#endregion
};
