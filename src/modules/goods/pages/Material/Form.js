import styles from "../../assets/material.module.scss";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";

import classNames from "classnames";

import { Controller, useForm } from "react-hook-form";

import { CRow, CCol, CCard, CCardBody } from "@coreui/react";

import { CInput, CCheckbox, CSelect, CNumber } from "_components/controls";

import { getAll } from "../../queries-fn/material-group.query";

export default forwardRef(({}, ref) => {
	const { control, reset, setValue, watch, handleSubmit } = useForm();

	const { data: groups } = getAll({});

	const onGroupChange = ({ value }) => setValue("group_id", value);

	useImperativeHandle(
		ref,
		() => ({
			handleSubmit,
			clear: (data = {}) => reset(data),
		}),
		[]
	);

	return (
		<>
			<CCard>
				<CCardBody>
					<CRow>
						<CCol xl="6" style={{ minWidth: "200px" }}>
							<Controller
								control={control}
								name="code"
								rules={{ required: true }}
								render={({ field }) => (
									<CInput label="Mã NVL" {...field} required />
								)}
							/>
						</CCol>
						<CCol xl="6" style={{ minWidth: "250px" }}>
							<Controller
								control={control}
								name="name"
								rules={{ required: true }}
								render={({ field }) => (
									<CInput label="Tên NVL" {...field} required />
								)}
							/>
						</CCol>
						<CCol xl="6" style={{ minWidth: "250px" }}>
							<Controller
								control={control}
								name="group_id"
								rules={{ required: true }}
								render={({ field }) => (
									<CSelect
										label="Nhóm NVL"
										options={groups ?? []}
										{...field}
										onChange={onGroupChange}
										required
									/>
								)}
							/>
						</CCol>
						<CCol xl="6" style={{ minWidth: "100px" }}>
							<Controller
								control={control}
								name="price"
								rules={{ required: true }}
								render={({ field }) => (
									<CNumber label="Đơn giá" {...field} required />
								)}
							/>
						</CCol>
					</CRow>
				</CCardBody>
			</CCard>

			<div className={classNames(styles["checkbox_group"])}>
				<div className="mr-4">
					<CCheckbox
						label="Ngưng cung cấp"
						className="text-black font-weight-bold"
					/>
				</div>
				<div className="mr-4">
					<Controller
						name="allow"
						control={control}
						render={({ field }) => (
							<CCheckbox
								label="Cho phép chi nhánh nhập hàng"
								className="text-black font-weight-bold"
								{...field}
							/>
						)}
					/>
				</div>
				<div className="mr-4">
					<CCheckbox
						label="Nhập về trung tâm"
						className="text-black font-weight-bold"
					/>
				</div>
			</div>

			<CCard>
				<CCardBody>
					<CRow>
						<CCol xs="12">
							<h5 className="text-icool-blue text-uppercase">Quy đổi</h5>
						</CCol>
						<CCol xs="12">
							<CRow>
								<CCol
									xl="6"
									style={{ order: 1 }}
									className={classNames(styles["unit"])}
								>
									<label className="font-weight-bold">
										Đơn vị công thức <span className="text-danger">*</span> :
									</label>
									<div className="form">
										<Controller
											control={control}
											name="unit"
											rules={{ required: true }}
											render={({ field }) => (
												<CInput className="w-100" required {...field} />
											)}
										/>
									</div>
								</CCol>
								<CCol
									xl="6"
									style={{ order: 3 }}
									className={classNames(styles["unit"], styles["exchange"])}
								>
									<label className="font-weight-bold">
										Đơn vị lưu kho <span className="text-danger">*</span> :
									</label>
									<div className={classNames(styles["form"])}>
										<Controller
											control={control}
											name="wareUnit"
											rules={{ required: true }}
											render={({ field }) => <CInput required {...field} />}
										/>
										<div className={classNames(styles["equal_sign"])}>
											<span> = </span>
										</div>
										<Controller
											control={control}
											name="ware_ex"
											rules={{ required: true }}
											render={({ field }) => (
												<CNumber
													className={styles["exchange_value"]}
													required
													{...field}
												/>
											)}
										/>
										<CInput
											readOnly
											className={styles["exchange_to"]}
											placeholder="(Theo DVCT)"
											tabIndex="-1"
											value={watch("unit")}
										/>
									</div>
								</CCol>
								<CCol
									xl="6"
									style={{ order: 2 }}
									className={classNames(styles["unit"], styles["exchange"])}
								>
									<label className="font-weight-bold">
										Đơn vị mua hàng <span className="text-danger">*</span> :
									</label>
									<div className={classNames(styles["form"])}>
										<Controller
											control={control}
											name="boughtUnit"
											rules={{ required: true }}
											render={({ field }) => <CInput required {...field} />}
										/>
										<div className={classNames(styles["equal_sign"])}>
											<span> = </span>
										</div>
										<Controller
											control={control}
											name="bought_ex"
											rules={{ required: true }}
											render={({ field }) => (
												<CNumber
													className={styles["exchange_value"]}
													required
													{...field}
												/>
											)}
										/>
										<CInput
											readOnly
											className={styles["exchange_to"]}
											placeholder="(Theo ĐVLK)"
											tabIndex="-1"
											value={watch("wareUnit")}
										/>
									</div>
								</CCol>
								<CCol
									xl="6"
									style={{ order: 4 }}
									className={classNames(styles["unit"], styles["exchange"])}
								>
									<label className="font-weight-bold">
										Đơn vị NCC <span className="text-danger">*</span> :
									</label>
									<div className={classNames(styles["form"])}>
										<Controller
											control={control}
											name="providerUnit"
											className={styles["exchange_to"]}
											rules={{ required: true }}
											render={({ field }) => <CInput required {...field} />}
										/>
										<div className={classNames(styles["equal_sign"])}>
											<span> = </span>
										</div>
										<Controller
											control={control}
											name="provider_ex"
											rules={{ required: true }}
											render={({ field }) => (
												<CNumber
													className={styles["exchange_value"]}
													required
													{...field}
												/>
											)}
										/>
										<CInput
											readOnly
											placeholder="(Theo ĐVMH)"
											className={styles["exchange_to"]}
											tabIndex="-1"
											value={watch("boughtUnit")}
										/>
									</div>
								</CCol>
							</CRow>
						</CCol>
					</CRow>
				</CCardBody>
			</CCard>

			<CCard>
				<CCardBody className="p-0">Table</CCardBody>
			</CCard>

			<CRow>
				<CCol
					xs="12"
					className="d-flex justify-content-between"
					style={{ alignItems: "flex-end" }}
				>
					<label className="text-black font-weight-bold">
						NCC nhiệm giao hàng:
					</label>
					<div style={{ width: "70%" }}>
						<CSelect className="m-0" />
					</div>
				</CCol>
			</CRow>
		</>
	);
});
