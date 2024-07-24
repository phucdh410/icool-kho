import { MinusCircle } from "_assets/icons";
import { CButton } from "_components/controls";

export default ({ disabled, code, name, onRemove }) => {
	return (
		<tr>
			<td className="text-left">
				<CButton
					icon={<MinusCircle />}
					disabled={disabled}
					shape="icon"
					onClick={onRemove}
				/>
			</td>
			<td className="px-2 text-left">{code}</td>
			<td className="px-2 text-left">{name}</td>
		</tr>
	);
};
