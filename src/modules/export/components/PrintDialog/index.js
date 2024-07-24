import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { CCol,CRow } from "@coreui/react";

import { getForPrint } from "_common/queries-fn/export.query";
import { CButton } from "_components/controls";
import { CDialog, CPrintComponent } from "_components/others";

import Footer from "./Footer";
import Header from "./Header";
import Table from "./Table";

import "../../assets/css/print.scss";

const PrintDialog = forwardRef(({ paperSize }, ref) => {
	//#region Data
	const componentRef = useRef();

	const [code, setCode] = useState();

	const { data: prints, isLoading } = getForPrint(code, !code);
	//#endregion

	//#region Event
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const onClose = () => setCode(null);
	//#endregion

	useImperativeHandle(
		ref,
		() => ({
			set: setCode,
		}),
		[]
	);

	//#region Render
	return (
		<CDialog
			show={!!code}
			onClose={onClose}
			footer={
				<>
					<CButton color="primary" className="btn-custom" onClick={handlePrint}>
						In
					</CButton>
					<CButton color="secondary" className="btn-custom" onClick={onClose}>
						Hủy
					</CButton>
				</>
			}
		>
			<div className="print-content" ref={componentRef}>
				{prints &&
					prints.map((d) => (
						<CPrintComponent key={d.id}>
							<Header data={d} name="Phiếu Giao Hàng" />
							<CRow className="my-4">
								<CCol xs="12">
									<Table data={d.materials} />
								</CCol>
							</CRow>
							<Footer data={d} />
						</CPrintComponent>
					))}
			</div>
		</CDialog>
	);
	//#endregion
});

export default PrintDialog;
