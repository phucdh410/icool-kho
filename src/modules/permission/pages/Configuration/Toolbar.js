import { CRow, CCol } from "@coreui/react";

import { CActionGroup } from "_components/others";

export default ({ status, selectedNo, onSave, onAdd, onEdit, onRemove }) => {
	const onClick = (state) => {
		switch (state) {
			case "add":
				return onAdd();
			case "edit":
				return onEdit();
			case "save":
				return onSave();
			case "remove":
				return onRemove();
		}
	};

	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							onClick={onClick}
							canAdd={status !== 3}
							canSave={status > 1}
							canEdit={selectedNo === 1 && status !== 2}
							canRemove={!!selectedNo && status < 2}
							status={status}
						/>
					</div>
				</CCol>
			</CRow>
		</>
	);
};
