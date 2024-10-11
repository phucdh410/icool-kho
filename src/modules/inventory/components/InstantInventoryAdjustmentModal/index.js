import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { C1Upload, CDate, CInput, CSelect } from "_components/controls";
import { CDialog, CTable } from "_components/others";

export const InstantInventoryAdjustmentModal = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: {
      code: "",
      store_code: "",
      file: null,
      date: dayjs().toDate(),
      materials: [],
    },
  });
  //#endregion

  //#region Event
  const onClose = () => setOpen(false);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
  }));

  //#region Render
  const fields = [
    {
      key: "code",
      label: "Mã NVL",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
    },
    {
      key: "ware_q",
      label: "Số lượng",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "ware_unit",
      label: "ĐVT",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "status",
      label: "Trạng thái",
      _style: { width: "150px", minWidth: "150px" },
    },
  ];
  const render = {
    name: ({ name }) => <td className="text-left">{name}</td>,
  };
  return (
    <CDialog title="Điều chỉnh lượng tồn kho" show={open} onClose={onClose}>
      <CCard>
        <CCardBody>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <CInput label="Mã phiếu" required {...field} />
              )}
            />
            <Controller
              control={control}
              name="store_code"
              render={({ field }) => (
                <CSelect label="Kho" options={[]} required {...field} />
              )}
            />
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <C1Upload label="Chứng từ đính kèm" required {...field} />
              )}
            />
            <Controller
              control={control}
              name="date"
              render={({ field }) => <CDate label="Ngày" required {...field} />}
            />
          </div>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-0">
          <CTable data={[]} fields={fields} render={render} />
        </CCardBody>
      </CCard>
    </CDialog>
  );
  //#endregion
});
