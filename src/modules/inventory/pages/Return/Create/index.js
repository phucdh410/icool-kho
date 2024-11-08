import { useForm } from "react-hook-form";

import { phieuTraHangApi } from "src/1/apis/phieu_tra_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/Return";
import { DEFAULT_VALUES } from "../form";

const InventoryReturnCreate = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await phieuTraHangApi.create(values);
        history.push("/inventory-return/list");
        noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.CREATE);
        reset(DEFAULT_VALUES);
      } catch (error) {
        noti("error", ERROR_MESSAGE.INVENTORY_RETURN.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return <Form onSubmit={onSubmit} control={control} />;
  //#endregion
};

export default InventoryReturnCreate;
