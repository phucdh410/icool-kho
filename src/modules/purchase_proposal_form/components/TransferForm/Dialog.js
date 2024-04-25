import { CCard, CCardBody, CSpinner } from "@coreui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { CButton, CDate } from "_components/controls";
import { CDialog } from "_components/others";

import { correctQuantity } from "src/apis/purchase_proposal_form.api";
import { isSuccess } from "src/utils/funcs";
import { useMutation } from "react-query";

export default forwardRef(({ onSuccess }, ref) => {
	const mutation = useMutation(({ storeCode, date }) =>
		correctQuantity({ storeCode, date })
	);
	//#region
	const [code, setCode] = useState();

	const [date, setDate] = useState(new Date());
	//#endregion

	//#region
	const onChange = (_date) => setDate(_date);

	const onSubmit = async () => {
		const res = await mutation.mutateAsync({
			storeCode: code,
			date: date,
		});

		if (isSuccess(res)) {
			onSuccess(res.data);
			setCode(null);
		}
	};

	const onClose = () => setCode(null);
	//#endregion

	useImperativeHandle(ref, () => ({ set: (_code) => setCode(_code) }), []);

	useEffect(() => !code && setDate(null), [code]);

	//#region
	return (
		<CDialog size="sm" className="m-auto" show={!!code} onClose={onClose}>
			<CCard>
				<CCardBody className="px-0">
					<div>
						<CDate
							value={date}
							maxDate={Date.now()}
							className="mx-auto inline"
							onChange={onChange}
							inline
						/>
					</div>
				</CCardBody>
			</CCard>
			<CCard>
				<CCardBody className="p-0">
					<CButton
						className="w-100"
						onClick={onSubmit}
						disabled={mutation.isLoading}
					>
						{mutation.isLoading ? (
							<CSpinner size="sm" className="text-center" color="primary" />
						) : (
							"Xác nhận"
						)}
					</CButton>
				</CCardBody>
			</CCard>
		</CDialog>
	);
	//#endregion
});
