import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { isFloatByUnit, money } from "src/utils/funcs";

import { CCheckbox,CInput, CNumber } from "_components/controls";

export default ({ isLoading, data, amount, onSelect, onChange }) => {
	const { control, watch, setValue, getValues } = useForm({
		defaultValues: { ...data, ...amount },
	});

	useEffect(() => {
		if (watch("wareQ") !== undefined) onChange(getValues());
	}, [watch("wareQ"), isLoading]);

	useEffect(() => {
		setValue("wareQ", amount.wareQ);
	}, [amount]);

	return (
		<tr>
			<td>
				<CCheckbox value={data.check} onChange={onSelect} />
			</td>
			<td>
				<CInput disabled value={data.code ?? ""} />
			</td>
			<td>
				<CInput disabled value={data.name ?? ""} />
			</td>
			<td>
				<CInput disabled value={data.wareUnit ?? ""} />
			</td>
			<td>
				<Controller
					name="wareQ"
					control={control}
					render={({ field }) => (
						<CNumber
							isFloat={isFloatByUnit(data.wareUnit)}
							min="0"
							{...field}
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
