import { useForm } from "react-hook-form";
import { MatHangForm } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { history } from "src/App";
import { useEffect } from "react";

const DeXuatGiaMatHang = () => {
  //#region Data
  const params = useParams();

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-de-xuat-hang-hoa", params?.code],
    queryFn: () => deXuatHangHoaApi.getByCode(params?.code),
    enabled: !!params?.code,
    select: (response) => response?.data?.data,
  });

  if (isError) {
    noti("error", "Không thể lấy thông tin đề xuất này!");
    history.replace("/goods/list");
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      industry_code: "",
      group_id: "",
      subject: "",
      predicate: "",
      complement: "",
      code: "",
      unit: "",
      standard: "",
      file: "",
      cost: 0,
      note: "",
      proposer_note: "",
      ware_note: "",
      accountant_note: "",
      ic_note: "",
      operator_note: "",
      materials: [],
    },
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          name: values?.name
            ? values.name
            : values.subject + " " + values.predicate + " " + values.complement,
          file: values.file?.id,
          materials: values.materials.map((e) => ({
            nvl_id: e?.nvl_id?.value,
            quantity: e?.quantity,
            ware_unit: e?.ware_unit,
          })),
        };

        await deXuatHangHoaApi.update(payload);

        noti("success", "Cập nhật đề xuất giá hàng hóa thành công!");
        reset();
        history.push("/goods/list");
      } catch (error) {
        noti("error", error?.message);
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        id: data?.id,
        industry_code: data?.industryName,
        group_id: data?.group?.code,
        group_name: data?.group?.name,
        name: data?.name,
        subject: data?.subject,
        predicate: data?.predicate,
        complement: data?.complement,
        code: data?.code,
        unit: data?.unit,
        standard: data?.standard,
        file: data?.file,
        cost: data?.cost,
        price: data?.price,
        holiday_price: data?.holiday_price,
        note: data?.note,
        proposer_note: data?.proposer_note,
        ic_note: data?.ic_note,
        operator_note: data?.operator_note,
        accountant_note: data?.accountant_note,
        ware_note: data?.ware_note,
        materials: data?.materials?.map((material) => ({
          nvl_id: { ...material, value: material?.code },
          quantity: material?.quantity ?? 0,
          ware_unit: material?.ware_unit,
          price: material?.price ?? 0,
        })),
      });
    }
  }, [data]);

  //#region Render
  return (
    <MatHangForm
      control={control}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      isEdit
      isSuggest
    />
  );
  //#endregion
};

export default DeXuatGiaMatHang;
