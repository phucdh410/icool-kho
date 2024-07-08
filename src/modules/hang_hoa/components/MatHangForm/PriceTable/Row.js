import { Controller } from "react-hook-form";
import { CNumber, CSelect } from "src/common/components/controls";

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
          render={({ field }) => (
            <>{(field.value ?? 0)?.toLocaleString("vi-VN")}</>
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
              display="wareUnit"
            />
          )}
        />
      </td>
    </tr>
  );
};
