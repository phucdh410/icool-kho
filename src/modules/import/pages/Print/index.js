import "../../assets/css/print.scss";

import { useState, useCallback, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";
import MPrintDialog from "../../components/PrintDialog";
import MPrintByGroupDialog from "../../components/PrintDialog/PrintByGroup";

import { getAll } from "_common/queries-fn/purchase-slip.query";
import { NAME } from "../../reducers/import-print";
import { setFilter } from "src/common/actions/config.action";

const selectData = createSelector(
	(state) => state.config,
	(state) => state.importPrint,
	({ isLoading }, { filters }) => ({ isLoading, filters })
);

const ImportPrint = ({}) => {
	const dispatch = useDispatch();

	const printRef = useRef(null);
	const printByGroupRef = useRef(null);

	//#region Data
	const { isLoading, filters } = useSelector(selectData);

	const [status, setStatus] = useState(0);

	const [paperSize, setPaperSize] = useState("A4");

	const { data, set } = getAll(filters, isLoading);

	const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

	const selected = useMemo(() => data?.filter((d) => d.check) || []);
	//#endregion

	//#region Event
	const select = useCallback(
		(code, v) =>
			set(
				data?.map((d) =>
					code === -1 || d.code === code ? { ...d, check: v } : d
				)
			),
		[data]
	);

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onSearch = useCallback(
		(data) => dispatch(setFilter(NAME, data)),
		[dispatch]
	);

	const onPrint = useCallback(
		async () => printRef.current.set(selected.map((s) => s.code)),
		[selected]
	);

	const onPrintMaterialByGroup = useCallback(
		async () => printByGroupRef.current.set(selected.map((s) => s.code)),
		[selected]
	);
	//#endregion

	return (
		<>
			<CCard className="toolbar">
				<CCardBody>
					<Toolbar
						filter={filters}
						status={status}
						selectedNo={selected.length}
						paperSize={paperSize}
						setPaperSize={setPaperSize}
						toggleStatus={onStatusChange}
						onSearch={onSearch}
						onPrint={onPrint}
						onPrintMaterialByGroup={onPrintMaterialByGroup}
					/>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardHeader></CCardHeader>
				<CCardBody className="px-0 pt-0">
					<Table
						loading={isLoading}
						isSelectAll={isSelectAll}
						data={data}
						onSelect={select}
					/>
				</CCardBody>
			</CCard>

			<MPrintDialog ref={printRef} paperSize={paperSize} />
			<MPrintByGroupDialog ref={printByGroupRef} paperSize={paperSize} />
		</>
	);
};

export default ImportPrint;
