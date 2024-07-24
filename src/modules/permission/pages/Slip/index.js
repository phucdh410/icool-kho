import { CCard, CCardBody } from "@coreui/react";

import { updateSlip } from "src/apis/configuration.api";
import { isSuccess } from "src/utils/funcs";

import { getAllSlips } from "_common/queries-fn/configuration.query";

import Table from "./Table";
import Toolbar from "./Toolbar";

const SlipPermission = () => {
	//#region Data
	const { data, set } = getAllSlips({});
	//#endregion

	//#region Event
	const onSave = async () => {
		const res = await updateSlip(data);

		if (isSuccess(res)) {
			// noti
			noti("success", "Cập nhật thành công");
		} else {
			noti("error", "Cập nhật thất bại");
		}
	};

	const onSelect = (id, value) =>
		set(
			data.map((d) => (d.id === id ? { ...d, value: value ? "1" : "0" } : d))
		);
	//#endregion

	//#region Render
	return (
		<>
			<CCard>
				<CCardBody>
					<Toolbar onSave={onSave} />
				</CCardBody>
			</CCard>
			<CCard>
				<CCardBody className="px-0">
					<Table data={data} onSelect={onSelect} />
				</CCardBody>
			</CCard>
		</>
	);
	//#endregion
};

export default SlipPermission;
