import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { comboApi } from "src/1/apis/combo.api";
import { useTabs } from "src/1/hooks/tab";
import { history } from "src/App";

import { ComboForm } from "../../components";
import { comboDefaultValues } from "../../form";

const SuaDeXuatCombo = () => {
  //#region Data
  const params = useParams();

  const { offCurrentTab } = useTabs("/combos/edit-suggest/:id");

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-de-xuat-combo", params?.id],
    queryFn: () => comboApi.getProposalById(params?.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  if (isError) {
    noti("error", "Không thể lấy thông tin chi tiết đề xuất combo!");
    offCurrentTab();
    history.push("/combos/suggest-list");
  }

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
        await comboApi.updateProposal(values?.id, payload);
        noti("success", "Sửa đề xuất combo thành công!");
        reset(comboDefaultValues);
        offCurrentTab();
        history.push("/combos/suggest-list");
      } catch (error) {
        noti("error", error?.message ?? "Sửa đề xuất combo thành công!");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        from: dayjs(data?.from).toDate(),
        to: dayjs(data?.to).toDate(),
        file_id: data?.file ?? null,
      });
    }
  }, [data]);

  //#region Render
  return <ComboForm control={control} onSubmit={onSubmit} />;
  //#endregion
};
export default SuaDeXuatCombo;
