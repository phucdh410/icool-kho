import { useRef, useMemo, useState, useCallback, useEffect } from "react";

import classNames from "classnames";

import { createSelector } from "reselect";
import { useSelector } from "react-redux";

import { CCard, CCardBody, CRow, CCol } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";
import ContainForm from "./ContainForm";

import { getAllExports } from "_common/queries-fn/configuration.query";
import {
	getMaterialGroupOf,
	updateCategories,
	removeCategories,
} from "src/apis/configuration.api";
import { isSuccess } from "src/utils/funcs";

const selectIsLoading = createSelector(
	(state) => state.config,
	({ isLoading }) => isLoading
);

const SummaryPermission = () => {
	//#region Data
	const isLoading = useSelector(selectIsLoading);

	const contain = useRef();

	const [status, setStatus] = useState(0);

	const [code, setCode] = useState(null);

	const { data, set, refetch } = getAllExports({}, isLoading);

	const isSelectAll = useMemo(
		() => data?.every((d) => d.check) ?? false,
		[data]
	);

	const selected = useMemo(() => data?.filter((d) => d.check) ?? [], [data]);
	//#endregion

	//#region Event

	const getCode = useCallback(() => {
		let _index = 1;
		const arr = data?.reduce((d, v) => ({ ...d, [v.id]: 1 }), {}) ?? {};

		while (arr[_index]) _index++;

		return _index;
	}, [data]);

	const onStatusChange = useCallback(
		(_status) => setStatus(_status === status ? 0 : _status),
		[status]
	);

	const onEdit = () => {
		if (selected[0]) {
			setCode(status === 3 ? null : selected[0].code);
			onStatusChange(3);
		}
	};

	const onAdd = () => {
		setCode(status === 2 ? null : getCode());
		onStatusChange(2);
	};

	const onSearch = () => {};

	const onSave = async () => {
		if (code) {
			const selected = contain.current
				.getSelected()
				.reduce((config, group) => ({ ...config, [group]: code }), {});

			// save data
			const res = await updateCategories(selected);

			if (isSuccess(res)) {
				onStatusChange(0);
				setCode(null);
				refetch();
			}
		}
	};

	const onRemove = async () => {
		const res = await removeCategories(selected.map((d) => d.id));
		if (isSuccess(res)) refetch();
	};

	const onSelect = (code, value) =>
		set(data.map((d) => (d.code === code ? { ...d, check: value } : d)));
	//#endregion

	useEffect(() => {
		if (code) {
			getMaterialGroupOf(code)
				.then(
					(res) => res && contain.current.setSelected(res.map((g) => g.code))
				)
				.catch(() => contain.current.setSelected([]));
		} else {
			contain.current.setSelected([]);
		}
	}, [code]);

	//#region Render
	return (
		<>
			<CCard>
				<CCardBody>
					<Toolbar
						status={status}
						selectedNo={selected.length}
						onEdit={onEdit}
						onAdd={onAdd}
						onSave={onSave}
						onRemove={onRemove}
						onSearch={onSearch}
					/>
				</CCardBody>
			</CCard>
			<CRow>
				<CCol xs="12" md={status ? 4 : 12}>
					<CCard>
						<CCardBody className="px-0">
							<Table
								status={status}
								isLoading={isLoading}
								data={data}
								isSelectAll={isSelectAll}
								onSelect={onSelect}
							/>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol xs="12" md="8" className={classNames(!status && "d-none")}>
					<CCard>
						<CCardBody>
							<ContainForm ref={contain} />
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	);
	//#endregion
};

export default SummaryPermission;
