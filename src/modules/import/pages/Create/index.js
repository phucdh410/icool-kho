import { useForm } from "react-hook-form";
import moment from "moment";

import { phieuNhapHangApi } from "src/1/apis/phieu_nhap_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import MForm from "../../components/Form";
import { importDefaultValues } from "../../form";

const ImportCreate = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: importDefaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, date, ...payload } = values;
        payload.date = moment(date).format("YYYY-MM-DD");
        await phieuNhapHangApi.create(payload);
        history.push("/import/list");
        reset(importDefaultValues);
        noti("success", SUCCESS_MESSAGE.IMPORT.CREATE);
      } catch (error) {
        noti("error", ERROR_MESSAGE.IMPORT.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <MForm
        control={control}
        isLoading={isSubmitting}
        onSubmit={onSubmit}
        setValue={setValue}
      />
    </>
  );
  //#endregion
};

export default ImportCreate;
