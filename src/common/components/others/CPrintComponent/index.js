import { CCard, CCardBody } from "@coreui/react";

import "./index.scss";

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
