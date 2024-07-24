import { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { isFloatByUnit,money } from "src/utils/funcs";

import { CCheckbox, CInput, CNumber,CSelect } from "_components/controls";

export default ({ data, ignore, options, onChange, onSelect }) => {
	const { watch, setValue, getValues, control, handleSubmit } = useForm({
		defaultValues: data,
	});

	const total = useMemo(() => {
		return watch("boughtPrice") * watch("boughtQ") || 0;
	}, [watch("boughtPrice"), watch("boughtQ")]);

	const isFloat = useMemo(
		() => isFloatByUnit(getValues("unit")),
		[watch("unit")]
	);

	const change = useCallback(({ data }) => {
		Object.keys(data).forEach((key) => setValue(key, data[key]));
		onChange(getValues());
	});

	const onNumberChange = useCallback((value) => {
		setValue("boughtQ", value);
		onChange(getValues());
	});

	const onNoteChange = useCallback((value) => {
		setValue("note", value);
		onChange(getValues());
	});

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
				<CInput readOnly value={watch("boughtUnit") || ""} />
			</td>
			<td className="px-2">
				<Controller
					name="boughtQ"
					control={control}
					render={({ field }) => (
						<CNumber
							isFloat={isFloat}
							min="0"
							max={watch("max") || 2000}
							{...field}
							onChange={onNumberChange}
						/>
					)}
				/>
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
