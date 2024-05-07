import { useEffect } from "react";

import { CCheckbox, CInput, CSelect, CNumber } from "_components/controls";
import { Controller, useController, useWatch } from "react-hook-form";

export default ({ options, control, index, update }) => {
  //#region Data
  const amountValue = useWatch({ control, name: `materials.${index}.amount` });
  const priceValue = useWatch({ control, name: `materials.${index}.price` });

  const {
    field: { onChange: changeTotal },
  } = useController({ control, name: `materials.${index}.total` });
  //#endregion

  //#region Event
  const onMaterialChange = (option) => {
    update(index, {
      check: false,
      material_id: option?.id,
      code: option?.code,
      amount: 1,
      price: option?.price || 0,
      total: option?.price || 0,
      note: "",
    });
  };
  //#endregion

  useEffect(() => {
    changeTotal(Number(amountValue) * Number(priceValue));
  }, [amountValue, priceValue]);

  //#region Render
  return (
    <tr>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.check`}
          render={({ field: { value, ...fields } }) => (
            <CCheckbox value={!!value} {...fields} />
          )}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => <CInput readOnly {...field} />}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.material_id`}
          render={({ field }) => (
            <CSelect
              className="text-left"
              options={options}
              {...field}
              onChange={onMaterialChange}
            />
          )}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.amount`}
          render={({ field }) => <CNumber min="1" max={2000} {...field} />}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.price`}
          render={({ field }) => <CNumber readOnly {...field} />}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.total`}
          render={({ field }) => <CNumber readOnly {...field} />}
        />
      </td>
      <td className="px-2">
        <Controller
          control={control}
          name={`materials.${index}.note`}
          render={({ field }) => <CInput {...field} />}
        />
      </td>
    </tr>
  );
  //#endregion
};
