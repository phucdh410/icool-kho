import "../../../assets/css/add-user.scss";

import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";

import {
	CCard,
	CCardBody,
	CCardHeader,
	CCardFooter,
	CRow,
	CCol,
} from "@coreui/react";
import { CInput, CButton } from "_components/controls";
import { CDialog } from "_components/others";
import { ERROR_MESSAGE } from "src/configs/constant";

const initialState = {
	code: "",
	name: "",
};

export default forwardRef(({ show, setShow, onAdd }, ref) => {
	//#region Data
	const { control, reset, handleSubmit, clearErrors } = useForm({
		defaultValues: initialState,
	});
	//#endregion

	//#region Event
	const onClose = () => {
		reset(initialState);
		setShow(false);
	};

	const addGroup = () => {
		clearErrors();
		handleSubmit(
			(d) => onAdd(d),
			(e) => noti("error", ERROR_MESSAGE.PERMISSION.GROUP_REQUIRED)
		)();
	};
	//#endregion

	useImperativeHandle(ref, () => ({ onClose }));

	//#region Render
	return (
		<CDialog show={show} size="" onClose={onClose}>
			<CCard className="add-user">
				<CCardHeader>
					<h5 className="m-0">Thêm nhóm</h5>
				</CCardHeader>
				<CCardBody>
					<CRow>
						<CCol xs="12">
							<Controller
								control={control}
								name="code"
								rules={{ required: true }}
								render={({ field }) => (
									<CInput label="Mã nhóm" required {...field} />
								)}
							/>
						</CCol>
						<CCol xs="12">
							<Controller
								control={control}
								name="name"
								rules={{ required: true }}
								render={({ field }) => (
									<CInput label="Tên nhóm" required {...field} />
								)}
							/>
						</CCol>
					</CRow>
				</CCardBody>
				<CCardFooter className="border-0">
					<div className="form-group c-input text-right">
						<div>
							<CButton className="m-0" onClick={addGroup}>
								Thêm nhóm
							</CButton>
						</div>
					</div>
				</CCardFooter>
			</CCard>
		</CDialog>
	);
	//#endregion
});
