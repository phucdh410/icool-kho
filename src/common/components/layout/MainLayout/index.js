import { Suspense } from "react";

import CHeader from "../CHeader";
import CRoutes from "../CRoutes";
import CSidebar from "../CSidebar";
import CToast from "../CToast";

const MainLayout = () => (
	<div className="c-app c-default-layout">
		<CSidebar />
		<div className="c-wrapper">
			<CHeader />
			<main className="c-body">
				<Suspense fallback={null}>
					<CRoutes />
				</Suspense>
			</main>
		</div>
		<CToast />
	</div>
);

export default MainLayout;
