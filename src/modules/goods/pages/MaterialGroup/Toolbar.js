import { useEffect } from "react";

import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { CRow, CCol, CCollapse } from "@coreui/react";

import { CInput, CButton } from "_components/controls";
import { CActionGroup } from "_components/others";

import { filter } from "src/utils/funcs";
import { Magnifying } from "_assets/icons";
import { ERROR_MESSAGE } from "src/configs/constant";

export default ({
	status,
	selectedNo,
	toggleStatus,
	onSearch,
	onAdd,
	onEdit,
	onRemove,
}) => {
	//#region Data
	const { control, handleSubmit } = useForm();

	const {
		control: formControl,
		reset,
		handleSubmit: save,
	} = useForm({
		mode: "onSubmit",
	});
	//#endregion

	//#region Event
	const toggleCollapse = () => toggleStatus(1);

	const search = handleSubmit(
		(d) => onSearch(filter(d)),
		(e) => {
			noti("error", ERROR_MESSAGE.MATERIAL_GROUP.REQUIRED);
		}
	);

	const onClick = (state) => {
		switch (state) {
			case "add":
				return toggleStatus(2);
			case "edit":
				return toggleStatus(3);
			case "save":
				if (status === 2)
					return save(
						(d) => onAdd(d),
						(e) => noti("error", ERROR_MESSAGE.MATERIAL_GROUP.REQUIRED)
					)();
				else if (status === 3) return onEdit();
			case "remove":
				return onRemove();
			case "print":
				return;
		}
	};
	//#endregion

	useEffect(() => reset(), [status]);

	return (
		<>
			<CRow>
				<CCol xs="12" className="action">
					<div>
						<CActionGroup
							status={status}
							onClick={onClick}
							canSave={status === 2 || status === 3}
							canEdit={selectedNo === 1}
							canRemove={selectedNo}
							canPrint={false}
						/>
					</div>
					<div
						className={classNames(
							"btn",
							"btn-primary",
							"btn-collapse",
							status == 1 && "show"
						)}
						onClick={toggleCollapse}
					></div>
				</CCol>
			</CRow>

			<CCollapse show={status === 2}>
				<CRow className="mt-3">
					<CCol xs="12" sm="6" md="5" lg="4" xl="3">
						<Controller
							name="code"
							control={formControl}
							rules={{ required: true }}
							defaultValue=""
							render={({ field }) => (
								<CInput label="Mã nhóm" {...field} required />
							)}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="5" lg="4" xl="4">
						<Controller
							name="name"
							control={formControl}
							rules={{ required: true }}
							defaultValue=""
							render={({ field }) => (
								<CInput label="Tên nhóm" {...field} required />
							)}
						/>
					</CCol>
				</CRow>
			</CCollapse>

			<CCollapse show={status === 1}>
				<CRow className="mt-3">
					<CCol xs="12" sm="6" md="3" lg="4" xl="3">
						<Controller
							name="code"
							control={control}
							defaultValue=""
							render={({ field }) => <CInput label="Mã nhóm" {...field} />}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="3" lg="4" xl="4">
						<Controller
							name="name"
							control={control}
							defaultValue=""
							render={({ field }) => <CInput label="Tên nhóm" {...field} />}
						/>
					</CCol>
					<CCol xs="12" sm="6" md="3" lg="2" xl="2" className="btn-search">
						<div className="form-group c-input">
							<div>
								<CButton icon={<Magnifying />} onClick={search}>
									Tìm kiếm
								</CButton>
							</div>
						</div>
					</CCol>
				</CRow>
			</CCollapse>
		</>
	);
};
