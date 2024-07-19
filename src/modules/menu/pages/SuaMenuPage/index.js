import { useForm } from "react-hook-form";
import { defaultValues, resolver } from "../../form";
import { MenuForm } from "../../components";
import { history } from "src/App";
import dayjs from "dayjs";
import { menuApi } from "src/1/apis/menu.api";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";

const TaoMenuPage = () => {
  //#region Data
  const params = useParams();

  const { data: detailResponse } = useQuery({
    queryKey: ["detail-menu", params?.id],
    queryFn: () => menuApi.getById(params?.id),
    select: (response) => response?.data?.data,
    enabled: !!params?.id,
  });

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
    resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          date: dayjs(values?.date).format("YYYY-MM-DD"),
        };

        await menuApi.update(params?.id, payload);

        noti("success", "Sửa menu thành công!");
        reset();

        history.push("/menus/list");
      } catch (error) {
        noti("error", error?.message ?? "Lỗi");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (detailResponse) {
      reset({
        ...detailResponse,
        status: detailResponse?.status ?? 1,
        holiday: !!detailResponse?.holiday,
        date: dayjs(detailResponse?.date).toDate(),
        stores: detailResponse?.stores?.map((e) => e?.store_code || e?.code),
      });
    }
  }, [detailResponse]);

  //#region Render
  return (
    <>
      <MenuForm onSubmit={onSubmit} control={control} />
    </>
  );
  //#endregion
};
export default TaoMenuPage;
