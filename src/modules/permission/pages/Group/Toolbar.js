import { CRow, CCol } from "@coreui/react";

import { CActionGroup } from "_components/others";

export default ({
	status,
	selectedNo,
	canSave,
	onAdd,
	onEdit,
	onSave,
	onRemove,
}) => {
	const onClick = (state) => {
		switch (state) {
			case "add":
				return onAdd();
			case "edit":
				return onEdit();
			case "remove":
				return onRemove();
			case "save":
				return onSave();
			case "print":
				return;
		}
	};
	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							onClick={onClick}
							canAdd={true}
							canSave={canSave}
							canEdit={selectedNo === 1}
							canRemove={!!selectedNo && status !== 3}
							status={status}
						/>
					</div>
				</CCol>
			</CRow>
		</>
	);
};
