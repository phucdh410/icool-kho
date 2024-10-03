import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import moment from "moment";

import { phieuNhapHangApi } from "src/1/apis/phieu_nhap_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import MForm from "../../components/Form";
import { importDefaultValues } from "../../form";

const ImportUpdate = ({ match: { params } }) => {
  //#region Data
  const { data } = useQuery({
    queryKey: ["chi-tiet-phieu-nhap-hang", params?.id],
    queryFn: () => phieuNhapHangApi.getById(params.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

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
        await phieuNhapHangApi.update(id, payload);
        history.push("/import/list");
        reset(importDefaultValues);
        noti("success", SUCCESS_MESSAGE.IMPORT.UPDATE);
      } catch (error) {
        noti("error", ERROR_MESSAGE.IMPORT.UPDATE);
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        date: moment(data?.date).toDate(),
        materials: data?.materials?.map((e) => ({ ...e, checked: false })),
      });
    }
  }, [data]);

  //#region Render
  return (
    <>
      <MForm
        control={control}
        isLoading={isSubmitting}
        onSubmit={onSubmit}
        setValue={setValue}
        isEdit
      />
    </>
  );
  //#endregion
};

export default ImportUpdate;
