import { CRow, CCol } from "@coreui/react";

import { CActionGroup } from "_components/others";

export default ({ onSave }) => {
	const onClick = (state) => {
		switch (state) {
			case "save":
				return onSave();
		}
	};
	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							onClick={onClick}
							canAdd={false}
							canSave={true}
							canEdit={false}
							canRemove={false}
						/>
					</div>
				</CCol>
			</CRow>
		</>
	);
};
