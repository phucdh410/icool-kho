import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { isFloatByUnit, money } from "src/utils/funcs";

import { CCheckbox, CInput, CNumber,CSelect } from "_components/controls";

export default ({ data, options, ignore, onSelect, onChange }) => {
	const { watch, control, setValue, getValues, handleSubmit } = useForm({
		defaultValues: data,
	});

	const emit = useCallback(
		handleSubmit(
			(d) => onChange(d),
			(e) => noti("error", e)
		),
		[onChange]
	);

	const changeMaterial = useCallback(
		({ data }) => Object.keys(data).forEach((key) => setValue(key, data[key])),
		[setValue]
	);

	useEffect(
		() => getValues("code") && emit(),
		[watch("code"), watch("boughtQ"), watch("boughtPrice")]
	);

	return (
		<tr>
			<td>
				<CCheckbox value={data.check} onChange={onSelect} />
			</td>
			<td className="px-2">
				<CInput value={watch("code")} readOnly />
			</td>
			<td className="px-2">
				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<CSelect
							className="text-left"
							options={options}
							{...field}
							ignore={ignore}
							onChange={changeMaterial}
						/>
					)}
				/>
			</td>
			<td className="px-2">
				<Controller
					name="boughtQ"
					control={control}
					render={({ field }) => (
						<CNumber
							isFloat={isFloatByUnit(watch("boughtUnit"))}
							min="0"
							{...field}
						/>
					)}
				/>
			</td>
			<td className="px-2">
				<Controller
					name="boughtUnit"
					control={control}
					render={({ field }) => <CInput readOnly {...field} />}
				/>
			</td>
			<td className="px-2">
				<Controller
					name="boughtPrice"
					control={control}
					render={({ field }) => <CNumber {...field} max={10000000} />}
				/>
			</td>
			<td className="px-2">
				<CInput
					value={money(
						(watch("boughtQ") ?? 0) * (watch("boughtPrice") ?? 0)
					)}
					readOnly
				></CInput>
			</td>
		</tr>
	);
};
