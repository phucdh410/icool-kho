import React from "react";

import { CSpinner } from "@coreui/react";

const Loading = ({ loading, children }) => {
	return (
		<>
			{loading ? (
				<div className="my-5 text-center">
					<CSpinner color="secondary" />
				</div>
			) : (
				children
			)}
		</>
	);
};

export default Loading;
