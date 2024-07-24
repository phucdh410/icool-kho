import { useEffect } from "react";

import { CModal, CModalBody, CModalFooter,CModalHeader } from "@coreui/react";

export default function Dialog({
	innerRef,
	show,
	children,
	footer,
	title,
	size,
	onClose,
	...rest
}) {
	useEffect(() => {
		if (show) document.querySelector("body").classList.add("modal-open");
		return () => document.querySelector("body").classList.remove("modal-open");
	}, [show]);

	return (
		<CModal innerRef={innerRef} show={show} onClose={onClose} size={size} {...rest}>
			<CModalHeader closeButton>{title}</CModalHeader>
			<CModalBody>{children}</CModalBody>
			{footer && <CModalFooter>{footer}</CModalFooter>}
		</CModal>
	);
}

Dialog.defaultProps = {
	size: "xl",
};
