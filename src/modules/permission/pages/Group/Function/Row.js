import { CCheckbox } from "_components/controls";
import { PERMISSION_VALUE } from "_configs/constant";

export default ({ code, name, value, onChange }) => {
	return (
		<tr>
			<td className="text-left">{name}</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.READ & value}
					onChange={onChange(code, PERMISSION_VALUE.READ)}
				/>
			</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.EXPORT & value}
					onChange={onChange(code, PERMISSION_VALUE.EXPORT)}
				/>
			</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.CREATE & value}
					onChange={onChange(code, PERMISSION_VALUE.CREATE)}
				/>
			</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.UPDATE & value}
					onChange={onChange(code, PERMISSION_VALUE.UPDATE)}
				/>
			</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.APPROVE & value}
					onChange={onChange(code, PERMISSION_VALUE.APPROVE)}
				/>
			</td>
			<td className="px-0">
				<CCheckbox
					className="mx-auto"
					value={PERMISSION_VALUE.DELETE & value}
					onChange={onChange(code, PERMISSION_VALUE.DELETE)}
				/>
			</td>
		</tr>
	);
};
