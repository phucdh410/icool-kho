import { forwardRef, useImperativeHandle, useState } from "react";

import { CCard, CCardBody } from "@coreui/react";
import { CDialog } from "_components/others";

const ImagePreview = (props, ref) => {
	const [show, setShow] = useState(false);
	const [file, setFile] = useState();

	const preview = (src, name) => {
		setShow(true);
		setFile({ src, name });
	};

	const onClose = () => {
		setShow(false);
		setFile(null);
	};

	useImperativeHandle(ref, () => ({ preview }));

	return (
		<CDialog show={show} onClose={onClose}>
			<CCard>
				<CCardBody>
					{file && <img src={file.src} alt={file.name} width="100%"></img>}
				</CCardBody>
			</CCard>
		</CDialog>
	);
};

export default forwardRef(ImagePreview);
