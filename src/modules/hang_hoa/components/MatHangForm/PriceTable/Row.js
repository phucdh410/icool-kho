import { Controller } from "react-hook-form";

import { CNumber, CSelect } from "src/common/components/controls";
import { money } from "src/utils/funcs";

export const Row = ({ control, material_options, index }) => {
  return (
    <tr>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="code"
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="name"
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="group_name"
            />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.quantity`}
          render={({ field }) => <CNumber readOnly {...field} />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.price`}
          render={({ field }) => <>{money(field.value)}</>}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="wareUnit"
            />
          )}
        />
      </td>
    </tr>
  );
};
