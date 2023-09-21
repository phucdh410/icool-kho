import { CButton } from "_components/controls";

import Row from "./Row";

import { PlusCircle } from "_assets/icons";

export default ({ status, employees, onAddEmployees, onRemoveEmployees }) => {
	//#region Data

	//#endregion

	//#region Event
	//#endregion

	//#region
	return (
		<table className="table table-hover border c-table selectable">
			<thead>
				<tr>
					<th style={{ width: "50px", minWidth: "50px", textAlign: "left" }}>
						<CButton
							icon={<PlusCircle />}
							disabled={!status}
							shape="icon"
							onClick={onAddEmployees}
						/>
					</th>
					<th style={{ width: "300px", minWidth: "300px", textAlign: "left" }}>
						Mã Nhân Viên
					</th>
					<th style={{ width: "300px", minWidth: "300px", textAlign: "left" }}>
						Tên Nhân Viên
					</th>
				</tr>
			</thead>
			<tbody>
				{employees.map((e) => (
					<Row
						disabled={!status}
						key={e.id}
						code={e.code}
						name={e.name}
						onRemove={onRemoveEmployees(e.code)}
					/>
				))}
			</tbody>
		</table>
		//#endregion
	);
};
