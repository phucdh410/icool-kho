import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { kiemKhoCuoiThangApi } from "src/1/apis/kiem_kho_cuoi_thang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/EndOfMonthCheck";
import { defaultValues } from "../form";

const InventoryCheckUpdate = ({ match: { params } }) => {
  //#region Data
  const { data, error } = useQuery({
    queryKey: ["chi-tiet-phieu-kiem-kho-cuoi-thang", params?.id],
    queryFn: () => kiemKhoCuoiThangApi.getById(params?.id),
    select: (response) => response?.data?.data,
  });

  useEffect(() => {
    if (!!error) {
      noti("error", error?.message ?? "Không thể lấy thông tin chi tiết phiếu");
      history.push("/inventory-end-of-month-check/list");
    }
  }, [error]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({ mode: "all", defaultValues: defaultValues });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = { ...values };
        payload.checked = dayjs(values?.checked).format("YYYY-MM-DD");
        payload.ware_code = values?.store_code;
        payload.materials = values?.materials?.map((e) => ({
          code: e?.code,
          ware_unit: e?.ware_unit,
          ware_q: e?.ware_q,
          unit: e?.unit,
          quantity: e?.ware_q,
          price: e?.price,
        }));

        await kiemKhoCuoiThangApi.update(params?.id, payload);
        history.push("/inventory-end-of-month-check/list");
        noti("success", SUCCESS_MESSAGE.INVENTORY_CHECK.UPDATE);
        reset(defaultValues);
      } catch (error) {
        noti("error", ERROR_MESSAGE.INVENTORY_CHECK.UPDATE);
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        checked: dayjs(data?.checked).toDate(),
        group_code: data?.group_code,
        store_code: data?.store_code,
        ware_code: data?.ware_code,
        value: data?.value,
        note: data?.note,
        materials: data?.materials?.map((e) => ({
          checked: false,
          code: e?.code,
          ware_unit: e?.ware_unit,
          ware_q: e?.ware_q,
          unit: e?.unit,
          quantity: e?.quantity,
          price: e?.price,
        })),
      });
    }
  }, [data]);

  //#region Render
  return (
    <Form
      isEdit
      onSubmit={onSubmit}
      loading={isSubmitting}
      control={control}
      setValue={setValue}
    />
  );
  //#endregion
};

export default InventoryCheckUpdate;
