import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { comboApi } from "src/1/apis/combo.api";
import { history } from "src/App";

import { ComboForm } from "../../components";
import { comboDefaultValues } from "../../form";

const SuaCombo = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-combo", params?.id],
    queryFn: () => comboApi.getComboById(params.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: comboDefaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          file_id: values?.file_id?.id,
          from: dayjs(values?.from).format("YYYY-MM-DD"),
          to: dayjs(values?.to).format("YYYY-MM-DD"),
        };
        await comboApi.update(params.id, payload);
        noti("success", "Sửa combo thành công!");
        reset(comboDefaultValues);
        history.push("/combos/list");
      } catch (error) {
        noti("error", error?.message ?? "Sửa combo thành công!");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data, file_id: data?.file });
    }
  }, [data]);

  //#region Render
  return <ComboForm control={control} onSubmit={onSubmit} />;
  //#endregion
};
export default SuaCombo;
