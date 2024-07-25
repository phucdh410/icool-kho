import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";

import { MarkInfo, MarkTable, MarkToolbar } from "../../components";

const ChamDiemNhaCungCap = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-diem-ncc", params?.supplierId],
    queryFn: () => nhaCungCapApi.getDetailSupplier(params?.supplierId),
    enabled: !!params?.supplierId,
    select: (response) => response?.data?.data,
  });
  console.log(data);

  const { control, watch, reset, handleSubmit } = useForm({ mode: "all" });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        noti("success", "Chấm điểm nhà cung cấp thành công!");
      } catch (error) {
        noti("error", error?.message || "Chấm điểm không thành công!");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  //#region Render
  return (
    <div className="flex flex-col gap-5">
      <MarkToolbar onSubmit={onSubmit} />

      <MarkInfo watch={watch} />

      <MarkTable control={control} />
    </div>
  );
  //#endregion
};
export default ChamDiemNhaCungCap;
