import { useForm } from "react-hook-form";
import moment from "moment";

import { phieuXuatHangApi } from "src/1/apis/phieu_xuat_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import MForm from "../../components/Form";
import { exportDefaultValues } from "../../form";

const ExportCreate = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: exportDefaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, date, ...payload } = values;
        payload.date = moment(date).format("YYYY-MM-DD");
        await phieuXuatHangApi.create(payload);
        history.push("/export/list");
        reset(exportDefaultValues);
        noti("success", SUCCESS_MESSAGE.EXPORT.CREATE);
      } catch (error) {
        noti("error", ERROR_MESSAGE.EXPORT.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <MForm
      control={control}
      isLoading={isSubmitting}
      onSubmit={onSubmit}
      setValue={setValue}
    />
  );
  //#endregion
};

export default ExportCreate;
