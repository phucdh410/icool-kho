import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CToast, CToaster, CToastHeader } from "@coreui/react";

import { removeNoti } from "_common/actions/config.action";

import { XCircleFill, TickCircleFill, WarningCircleFill } from "_assets/icons";

const selectNotification = createSelector(
	(state) => state.config,
	({ notification }) => notification
);

const Toast = () => {
	const dispatch = useDispatch();
	const toasts = useSelector(selectNotification);

	const onStateChange = (e, i) => e === false && dispatch(removeNoti(i));

	const renderIcon = useCallback((type) => {
		switch (type) {
			case "error":
				return <XCircleFill />;
			case "warning":
				return <WarningCircleFill />;
			default:
				return <TickCircleFill />;
		}
	}, []);

	return (
		<CToaster position={"top-right"} className="custom-notification">
			{toasts.map((toast, i) => {
				return (
					<CToast
						key={toast.no}
						show={true}
						autohide={toast.autohide}
						fade={toast.fade}
						onStateChange={(e) => onStateChange(e, i)}
						className={toast.status}
					>
						<CToastHeader closeButton={toast.closeButton}>
							<>
								{renderIcon(toast.status)}
								{toast.title}
							</>
						</CToastHeader>
					</CToast>
				);
			})}
		</CToaster>
	);
};

export default Toast;
