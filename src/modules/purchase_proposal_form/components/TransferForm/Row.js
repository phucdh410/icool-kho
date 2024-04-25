import { useCallback, useMemo } from "react";

import { CCheckbox, CInput, CSelect, CNumber } from "_components/controls";
import { Controller, useForm } from "react-hook-form";

import { money } from "src/utils/funcs";

export default ({ data, options, onSelect, index }) => {
  return (
    <tr>
      <td className="px-2">
        <CCheckbox value={data.check} onChange={onSelect} />
      </td>
      <td className="px-2">
        <CInput readOnly value={watch("code") || ""} />
      </td>
      <td className="px-2">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <CSelect
              className="text-left"
              options={options}
              ignore={ignore}
              {...field}
              onChange={change}
            />
          )}
        />
      </td>
      <td className="px-2">
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <CNumber
              min="1"
              max={watch("max") || 2000}
              {...field}
              onChange={onNumberChange}
            />
          )}
        />
      </td>
      <td className="px-2">
        <CInput readOnly value={money(watch("price")) || 0} />
      </td>
      <td className="px-2">
        <CInput readOnly value={money(total)} />
      </td>
      <td className="px-2">
        <Controller
          name="note"
          control={control}
          defaultValue=""
          render={({ field }) => <CInput {...field} onChange={onNoteChange} />}
        />
      </td>
    </tr>
  );
};
