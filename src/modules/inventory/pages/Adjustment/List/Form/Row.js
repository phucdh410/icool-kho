import { useMemo } from "react";

import { CCheckbox } from "_components/controls";

export default ({ data, onSelect }) => {
	const status = useMemo(() => {
		if (data.approvedStatus)
			return <span className="text-success">Xác nhận</span>;
		else return <span className="text-danger">Chờ xác nhận</span>;
	}, [data.approvedStatus]);

	return (
		<tr>
			<td>
				<CCheckbox
					value={data.check}
					disabled={data.approvedStatus}
					onChange={onSelect}
				/>
			</td>
			<td>{status}</td>
			<td>{data.code}</td>
			<td>{data.name}</td>
			<td>{data.wareQ}</td>
			<td>{data.wareUnit}</td>
		</tr>
	);
};
