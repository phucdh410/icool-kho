import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const _Swal = Swal.mixin({
	customClass: {
		confirmButton: "btn btn-success mx-2",
		cancelButton: "btn btn-danger mx-2",
	},
	buttonsStyling: false,
});

const MySwal = withReactContent(_Swal);

export const fireDelete = async () => {
	const res = await MySwal.fire({
		title: "Bạn có chắc không?",
		text: "Bạn sẽ không thể hoàn nguyên điều này! ",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "Xóa",
		cancelButtonText: "Hủy",
		reverseButtons: true,
		customClass: {
			confirmButton: "btn btn-success ml-3",
			cancelButton: "btn btn-danger mr-3",
		},
	});
	return res.isConfirmed;
};

export const fireSuccess = (title = "Deleted", message = "Đã xóa") =>
	MySwal.fire(title, message, "success");

export const fireError = (title = "Can`t delete", meseage = "Không thế xóa") =>
	MySwal.fire(title, meseage, "error");
