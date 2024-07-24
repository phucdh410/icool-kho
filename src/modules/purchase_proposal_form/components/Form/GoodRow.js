import { useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { isFloatByUnit,money } from "src/utils/funcs";

import { CCheckbox, CInput, CNumber,CSelect } from "_components/controls";

export default ({ data, options, ignore, onChange, onSelect }) => {
	const { watch, setValue, getValues, control, handleSubmit } = useForm({
		defaultValues: data,
	});

	const emit = useCallback(
		handleSubmit(
			(d) => onChange(d),
			(e) => noti("error", e)
		),
		[onChange]
	);

	const total = useMemo(() => {
		return watch("price") * watch("quantity") || 0;
	}, [watch("price"), watch("quantity")]);

	const isFloat = useMemo(
		() => isFloatByUnit(getValues("unit")),
		[watch("unit")]
	);

	const change = useCallback(({ data }) =>
		Object.keys(data).forEach((key) => setValue(key, data[key]))
	);

	useEffect(() => {
		if (getValues("code")) emit();
	}, [watch("code"), watch("quantity"), watch("note")]);

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
				<CInput readOnly value={watch("unit") || ""} />
			</td>
			<td className="px-2">
				<Controller
					name="quantity"
					control={control}
					render={({ field }) => (
						<CNumber isFloat={isFloat} min="0" {...field} />
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
					render={({ field }) => <CInput {...field} />}
				/>
			</td>
		</tr>
	);
};
