import "./index.scss";

import { CCard, CCardBody } from "@coreui/react";

export default ({ children }) => {
	return (
		<>
			<CCard>
				<CCardBody className="p-5">{children}</CCardBody>
			</CCard>
			<div className="page-break"></div>
		</>
	);
};
