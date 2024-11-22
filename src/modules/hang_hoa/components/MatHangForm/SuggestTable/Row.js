import { Controller } from "react-hook-form";

import { CNumber, CSelect } from "src/common/components/controls";
import { money } from "src/utils/funcs";

export const Row = ({
  control,
  material_options,
  onSelectMaterial,
  index,
  onRemoveRow,
}) => {
  return (
    <tr>
      <td>
        <button
          onClick={onRemoveRow(index)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-solid fa-trash-can-xmark text-2xl text-[#F26464]"></i>
        </button>
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field }) => (
            <CSelect
              {...field}
              onChange={onSelectMaterial(index)}
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
              onChange={onSelectMaterial(index)}
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
          render={({ field }) => <CNumber {...field} />}
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
