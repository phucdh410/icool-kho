import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { CInput, CNumber, CCheckbox, CSelect } from "_components/controls";

import { isFloatByUnit, money } from "src/utils/funcs";

export default ({
	isLoading,
	materials,
	data,
	amounts,
	onSelect,
	onChange,
}) => {
	const { control, watch, setValue, getValues } = useForm({
		defaultValues: { ...data, ...amounts[data.code] },
	});

	const currentAmount = useMemo(
		() => amounts[watch("code")] ?? {},
		[watch("code"), amounts]
	);

	const onSelectMaterial = ({ data }) => {
		Object.keys(data).forEach((key) => setValue(key, data[key]));
	};

	const onAmountChange = (v) =>
		watch("code") !== undefined && onChange({ ...getValues(), wareQ: v });

	useEffect(
		() =>
			watch("code") !== undefined &&
			onChange({
				...getValues(),
				wareQ: amounts[getValues("code")]?.wareQ ?? 0,
			}),
		[watch("code"), amounts, isLoading]
	);

	useEffect(
		() => setValue("wareQ", currentAmount?.wareQ || 0),
		[currentAmount]
	);

	return (
		<tr>
			<td>
				<CCheckbox value={data.check} onChange={onSelect} />
			</td>
			<td>
				<CInput disabled value={watch("code") ?? ""} />
			</td>
			<td>
				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<CSelect
							className="text-left"
							options={materials}
							{...field}
							onChange={onSelectMaterial}
						/>
					)}
				/>
			</td>
			<td>
				<CInput disabled value={watch("wareUnit") ?? ""} />
			</td>
			<td>
				<Controller
					name="wareQ"
					control={control}
					render={({ field }) => (
						<CNumber
							{...field}
							isFloat={isFloatByUnit(watch("wareUnit"))}
							value={currentAmount.wareQ}
							onChange={onAmountChange}
						/>
					)}
				/>
			</td>
			<td>
				<CInput disabled value={money(watch("warePrice") ?? "0")} />
			</td>
			<td>
				<CInput
					disabled
					value={money(watch("warePrice") * (watch("wareQ") ?? 0))}
				/>
			</td>
		</tr>
	);
};
