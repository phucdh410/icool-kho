import { forwardRef, useImperativeHandle, useState } from "react";
import { CDialog } from "_components/others";
import { CCard } from "@coreui/react";
import { Controller, useController, useForm } from "react-hook-form";
import { CButton, CDate, CInput, CSelect } from "_components/controls";
import { getAll } from "../../queries-fn/store.query";
import { fireError, fireSuccess } from "src/utils/alert";
import { format } from "src/utils/moment";
import { handleQuantitative } from "src/apis/purchase_proposal_form.api";
import moment from "moment";
import { isSuccess } from "src/utils/funcs";

const defaultValues = {
  storeCode: "",
  date: new Date(),
  note: "",
};

export const MQuantitativeDialog = forwardRef(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { data: stores } = getAll();

  const { control, reset, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
  });

  const {
    field: { onChange: onStoreChange },
  } = useController({ control, name: "storeCode" });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const onStoreSelect = (e) => {
    onStoreChange(e?.value);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      const body = { ...values, date: format(values?.date, "YYYY-MM-DD") };

      const res = await handleQuantitative(body);

      if (isSuccess(res)) {
        fireSuccess("Thành công", "Cập nhật định lượng thành công!");

        refetch();
        onClose();
      } else {
        fireError("Lỗi", "Cập nhật định lượng không thành công!");
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) {
        reset({
          date: moment(data?.updated_date).toDate(),
          note: data?.note,
          storeCode: data?.store_code,
        });
      }
      setOpen(true);
    },
  }));

  //#region Render
  return (
    <CDialog
      size="md"
      className="m-auto"
      show={open}
      onClose={onClose}
      title="Cập nhật định lượng"
    >
      <CCard>
        <form method="GET" onSubmit={onSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "12px",
            }}
          >
            <div>
              <Controller
                name="storeCode"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CSelect
                    label="Chi nhánh"
                    {...field}
                    placeholder="Chọn chi nhánh ->"
                    options={stores}
                    onChange={onStoreSelect}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CDate label="Ngày cập nhật định lượng" {...field} />
                )}
              />
            </div>
            <div>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <CInput
                    label="Ghi chú"
                    placeholder="Nhập ghi chú..."
                    {...field}
                  />
                )}
              />
            </div>
            <div
              style={{
                marginBlock: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <CButton onClick={onSubmit}>Xác nhận</CButton>
              <CButton onClick={onClose}>Đóng</CButton>
            </div>
          </div>
        </form>
      </CCard>
    </CDialog>
  );
  //#endregion
});
