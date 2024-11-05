import { Controller } from "react-hook-form";

import { CViewableFile } from "src/1/common/components/controls";

import { CCheckbox, CInput, CNumberInput } from "_components/controls";

export default ({ control, index, onSelect, selected }) => {
  //#region Render
  return (
    <tr>
      <td>
        <CCheckbox
          value={selected.includes(index)}
          onChange={onSelect(index)}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.name`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.quantity`}
          render={({ field }) => <CNumberInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.unit`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.price`}
          render={({ field }) => <CNumberInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}`}
          render={({ field: { value } }) => (
            <CNumberInput value={value?.quantity * value?.price} disabled />
          )}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.reason`}
          render={({ field }) => <CInput {...field} disabled />}
        />
      </td>
      <td>
        <Controller
          control={control}
          name={`materials.${index}.documents`}
          render={({ field: { value } }) => (
            <div className="flex flex-row gap-1">
              {value.map((file) => (
                <CViewableFile key={file?.id} file={file} />
              ))}
            </div>
          )}
        />
      </td>
    </tr>
  );
  //#endregion
};
