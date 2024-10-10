import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import { kiemKhoCuoiThangApi } from "src/1/apis/kiem_kho_cuoi_thang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/EndOfMonthCheck";
import { defaultValues } from "../form";

const InventoryCheckCreate = () => {
  //#region Data
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

        await kiemKhoCuoiThangApi.create(payload);
        history.push("/inventory-end-of-month-check/list");
        noti("success", SUCCESS_MESSAGE.INVENTORY_CHECK.CREATE);
        reset(defaultValues);
      } catch (error) {
        noti("error", ERROR_MESSAGE.INVENTORY_CHECK.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Form
      onSubmit={onSubmit}
      loading={isSubmitting}
      control={control}
      setValue={setValue}
    />
  );
  //#endregion
};

export default InventoryCheckCreate;
