import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { chatLuongHangHoaApi } from "src/1/apis/chat_luong_hang_hoa.api";
import { history } from "src/App";

import { MarkInfo, MarkTable, MarkToolbar } from "../../components";
import { markDefaulValues as defaultValues } from "../../form";

const NhaCungCapChamDiem = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-diem-ncc", params?.supplierId],
    queryFn: () => chatLuongHangHoaApi.getSupplierById(params?.supplierId),
    enabled: !!params?.supplierId,
    select: (response) => response?.data?.data,
  });

  const { control, watch, reset, handleSubmit } = useForm({
    mode: "all",
    defaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          files: values?.files?.map((file) => file?.id),
          decision: Number(values?.decision),
          final_note: values?.final_note,
          evaluations: values?.evaluations,
        };

        await chatLuongHangHoaApi.updateSupplier(params?.supplierId, payload);

        noti("success", "Chấm điểm hàng hóa thành công!");
        reset(defaultValues);
        history.push(`/goods-quality/rating/${params?.id}`);
      } catch (error) {
        noti("error", error?.message || "Chấm điểm không thành công!");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data, decision: data?.decision ? "1" : "0" });
    }
  }, [data]);

  //#region Render
  return (
    <div className="flex flex-col">
      <MarkToolbar onSubmit={onSubmit} />

      <MarkInfo watch={watch} />

      <MarkTable control={control} />
    </div>
  );
  //#endregion
};
export default NhaCungCapChamDiem;
