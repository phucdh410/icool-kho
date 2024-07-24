import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { hangHoaApi } from "src/1/apis/hang_hoa.api";
import { history } from "src/App";

import { MatHangForm } from "../../components";

const DieuChinhGiaHangHoa = () => {
  //#region Data
  const params = useParams();

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-hang-hoa", params?.code],
    queryFn: () => hangHoaApi.getByCode(params?.code),
    enabled: !!params?.code,
    select: (response) => response?.data?.data,
  });

  if (isError) {
    noti("error", "Không thể lấy thông tin hàng hóa này!");
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
        const { price, holiday_price, vat } = values;

        await hangHoaApi.updatePrice(params?.code, {
          price,
          holiday_price,
          vat,
        });

        noti("success", "Cập nhật giá hàng hóa thành công!");
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
      isPriceEdit
    />
  );
  //#endregion
};

export default DieuChinhGiaHangHoa;
