import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import moment from "moment";

import { phieuXuatHangApi } from "src/1/apis/phieu_xuat_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import MForm from "../../components/Form";
import { exportDefaultValues } from "../../form";

const ExportUpdate = ({ match: { params } }) => {
  //#region Data
  const { data } = useQuery({
    queryKey: ["chi-tiet-phieu-xuat-hang", params?.id],
    queryFn: () => phieuXuatHangApi.getById(params.id),
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
    defaultValues: exportDefaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, date, ...payload } = values;
        payload.date = moment(date).format("YYYY-MM-DD");
        await phieuXuatHangApi.update(id, payload);
        history.push("/export/list");
        reset(exportDefaultValues);
        noti("success", SUCCESS_MESSAGE.EXPORT.UPDATE);
      } catch (error) {
        noti("error", ERROR_MESSAGE.EXPORT.UPDATE);
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

export default ExportUpdate;
